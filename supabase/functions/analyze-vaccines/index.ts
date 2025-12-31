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
    const { age, completedVaccines, sex } = await req.json();
    
    if (age === undefined || age === null) {
      return new Response(
        JSON.stringify({ error: 'Age is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing vaccines for age:', age, 'completed:', completedVaccines, 'sex:', sex);

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
            content: `Tu es un expert en vaccination et calendrier vaccinal français. Tu analyses la situation vaccinale d'un patient.

RÈGLES IMPORTANTES pour le rattrapage vaccinal :
1. Certains vaccins NE PEUVENT PLUS être rattrapés après un certain âge :
   - Haemophilus influenzae b : rattrapage possible UNIQUEMENT jusqu'à 5 ans
   - Pneumocoque (schéma nourrisson) : rattrapage adapté jusqu'à 2 ans
   - Méningocoque C : rattrapage possible jusqu'à 24 ans
   - ROR : rattrapage possible à tout âge si non fait
   - HPV : recommandé 11-14 ans, rattrapage possible 15-19 ans (3 doses), possible jusqu'à 26 ans pour les HSH
   - DTP : rappels tous les 20 ans après 25 ans (25, 45, 65 ans puis tous les 10 ans)

2. Vaccins du nourrisson (2, 4, 11 mois) : si la personne a plus de 5 ans et n'a pas été vaccinée, ne PAS les mettre en retard car non rattrapables

3. Pour les adultes de plus de 25 ans, les principaux rappels sont :
   - DTP tous les 20 ans (25, 45, 65 ans, puis tous les 10 ans après 65)
   - Grippe annuelle recommandée après 65 ans
   - Zona recommandé après 65 ans

Réponds UNIQUEMENT avec un JSON valide sans markdown :
{
  "enRetard": [
    { "name": "Nom vaccin", "dueAge": "âge prévu", "note": "explication", "canCatchUp": true, "catchUpInfo": "comment rattraper" }
  ],
  "aVenir": [
    { "name": "Nom vaccin", "nextAge": "âge prévu", "note": "explication" }
  ],
  "nonRattrapables": [
    { "name": "Nom vaccin", "reason": "explication pourquoi trop tard" }
  ],
  "recommandations": ["conseil personnalisé 1", "conseil personnalisé 2"]
}`
          },
          {
            role: 'user',
            content: `Patient de ${age} ans, sexe: ${sex || 'non précisé'}.
Vaccins déjà réalisés: ${completedVaccines && completedVaccines.length > 0 ? completedVaccines.join(', ') : 'aucun indiqué'}.

Analyse la situation vaccinale de ce patient selon le calendrier vaccinal français officiel. 
- Liste les vaccins en retard QUI PEUVENT ENCORE ÊTRE RATTRAPÉS
- Liste les vaccins à venir
- Liste les vaccins qui NE PEUVENT PLUS être rattrapés car trop tard
- Donne des recommandations personnalisées`
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

    let analysis;
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
      analysis = JSON.parse(cleanContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Invalid AI response format');
    }

    return new Response(
      JSON.stringify({ success: true, data: analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-vaccines function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
