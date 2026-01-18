import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { country } = await req.json();
    
    if (!country) {
      return new Response(
        JSON.stringify({ error: 'Country is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Fetching travel recommendations for:', country);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en médecine des voyages et santé internationale. Tu fournis des recommandations sanitaires pour les voyageurs français.

## RÈGLES ÉDITORIALES OBLIGATOIRES (Medisafe)

### INTERDICTION FORMELLE DU COPIÉ-COLLÉ
- ❌ Ne JAMAIS copier mot pour mot des contenus de sites tiers
- ❌ Ne JAMAIS reprendre la structure exacte ou formulations de sites institutionnels
- ✅ Tous les contenus doivent être REFORMULÉS, SYNTHÉTISÉS et ADAPTÉS

### MÉTHODE DE RÉDACTION
- Synthétiser l'information essentielle
- Hiérarchiser les messages (priorité pratique pour le voyageur)
- Langage clair, professionnel et concis
- Phrases courtes et actionnables
- L'objectif est une AIDE À LA DÉCISION, pas une reproduction documentaire

### GESTION DES SOURCES
🔹 Sources pouvant être citées : Institut Pasteur, Santé publique France, OMS
🔹 Utilise UNIQUEMENT des URLs qui existent réellement :
   - Institut Pasteur : https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage
   - Santé Publique France : https://www.santepubliquefrance.fr
   - Ministère des Affaires étrangères : https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/
   - OMS : https://www.who.int/fr

### POSITIONNEMENT
- Contenu présenté comme une synthèse indépendante
- L'IA est un outil de structuration et de synthèse

---

Pour chaque pays, fournis de manière SYNTHÉTISÉE :
1. Les vaccinations obligatoires (exigées pour l'entrée)
2. Les vaccinations recommandées
3. Les informations sur le paludisme (zones à risque, prophylaxie)
4. Les conseils pratiques de prévention
5. Les sources officielles avec leurs URLs EXACTES

Réponds UNIQUEMENT avec un JSON valide sans markdown :
{
  "vaccinsObligatoires": [
    { "name": "Nom du vaccin", "note": "Détails SYNTHÉTISÉS" }
  ],
  "vaccinsRecommandes": [
    { "name": "Nom du vaccin", "note": "Détails SYNTHÉTISÉS" }
  ],
  "prophylaxies": [
    {
      "name": "Paludisme",
      "zone": "Description SYNTHÉTISÉE des zones à risque",
      "traitement": "Traitements recommandés",
      "duree": "Durée du traitement",
      "contrindications": "Contre-indications principales"
    }
  ],
  "conseils": ["Conseil REFORMULÉ 1", "Conseil REFORMULÉ 2"],
  "sources": [
    { "name": "Institut Pasteur - Centre médical", "url": "https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage" },
    { "name": "Diplomatie.gouv.fr - Conseils voyageurs", "url": "https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/" }
  ]
}

Si le paludisme n'est pas présent, retourne un tableau prophylaxies vide.
Fournis TOUJOURS au moins 3 sources avec des URLs valides.`
          },
          {
            role: 'user',
            content: `Quelles sont les recommandations sanitaires et vaccinales SYNTHÉTISÉES pour un voyage en ${country} ?

RAPPEL : REFORMULE toutes les informations avec tes propres mots, phrases courtes et actionnables.`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Trop de requêtes, veuillez réessayer.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Crédits insuffisants.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI response:', content);

    let recommendations;
    try {
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      recommendations = JSON.parse(cleanContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Invalid AI response format');
    }

    return new Response(
      JSON.stringify({ success: true, data: recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in travel-recommendations function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
