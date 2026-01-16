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
    const { age, completedVaccines, sex, isPregnant } = await req.json();
    
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

    console.log('Analyzing vaccines for age:', age, 'completed:', completedVaccines, 'sex:', sex, 'isPregnant:', isPregnant);

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
            content: `Tu es un expert en vaccination et calendrier vaccinal français 2024-2025. Tu analyses la situation vaccinale d'un patient en te basant sur les dernières recommandations officielles de Santé publique France et du Ministère de la Santé.

SOURCE OFFICIELLE UNIQUE : Calendrier des vaccinations - Santé publique France (mise à jour 2024-2025)

RÈGLE IMPORTANTE SUR LA NOMENCLATURE :
- Le vaccin combiné Diphtérie-Tétanos-Coqueluche-Polio s'appelle "DTCP" (et NON "DTP" ou "dTcaP")
- N'utilise JAMAIS "DTP + Coqueluche" séparément, c'est toujours "DTCP" en un seul vaccin
- Le vaccin DTCP inclut déjà la coqueluche, ne mentionne jamais la coqueluche séparément

MISES À JOUR CALENDRIER VACCINAL 2024-2025 :

1. HPV (PAPILLOMAVIRUS) - MISE À JOUR IMPORTANTE :
   - Vaccination systématique : 11-14 ans (2 doses espacées de 6 mois)
   - RATTRAPAGE : possible de 15 à 19 ans révolus (3 doses) pour TOUS (filles ET garçons)
   - RATTRAPAGE ÉTENDU jusqu'à 26 ans pour les HSH (hommes ayant des relations sexuelles avec des hommes)
   - Recommandation : toute personne non vaccinée entre 11 et 19 ans peut se faire vacciner

2. PNEUMOCOQUE - PREVENAR 20 (PCV20) :
   - Remplace progressivement Prevenar 13
   - Nourrissons : schéma 2+1 (2, 4, 11 mois)
   - Adultes 65+ ans : 1 dose recommandée (même si déjà vacciné Prevenar 13)
   - Personnes à risque (immunodéprimés, pathologies chroniques) : recommandé à tout âge

3. MÉNINGOCOQUE B (Bexsero) :
   - Recommandé pour tous les nourrissons depuis 2021
   - Rattrapage possible jusqu'à 24 ans

4. MÉNINGOCOQUE ACWY :
   - Recommandé à 11-14 ans
   - Obligatoire pour certains voyages (pèlerinage, zones endémiques)

5. VRS (Virus Respiratoire Syncytial) - NOUVEAU 2024 :
   - Abrysvo ou Arexvy pour les 60+ ans
   - Beyfortus pour les nourrissons (anticorps monoclonaux)
   - RECOMMANDÉ pour les femmes enceintes (Abrysvo) entre 32 et 36 SA pour protéger le nourrisson

6. COVID-19 :
   - Rappels recommandés pour 65+ ans et personnes à risque (automne)

RÈGLES DE RATTRAPAGE ACTUALISÉES :
- HPV : jusqu'à 19 ans révolus pour tous, jusqu'à 26 ans pour HSH
- Méningocoque C : jusqu'à 24 ans
- Méningocoque B : jusqu'à 24 ans
- ROR : rattrapage possible à tout âge
- Hépatite B : rattrapage possible à tout âge
- DTCP : rappels à 25, 45, 65 ans puis tous les 10 ans

VACCINS ADULTES :
- DTCP : rappels à 25, 45, 65 ans puis tous les 10 ans
- Grippe : annuelle dès 65 ans ou si à risque
- Zona (Shingrix) : dès 65 ans - 2 doses
- Pneumocoque (Prevenar 20) : dès 65 ans ou si à risque
- VRS : dès 60 ans (nouveau 2024)
- COVID : rappel annuel si 65+ ou à risque

VACCINATIONS ET GROSSESSE :
- VACCINS RECOMMANDÉS pendant la grossesse :
  * Grippe : recommandé quel que soit le trimestre
  * COVID-19 : recommandé quel que soit le trimestre
  * Coqueluche (dTcaP) : recommandé entre 20 et 36 SA (idéalement avant 32 SA) à chaque grossesse
  * VRS (Abrysvo) : recommandé entre 32 et 36 SA pour protéger le nouveau-né

- VACCINS CONTRE-INDIQUÉS pendant la grossesse (vaccins vivants atténués) :
  * ROR (Rougeole-Oreillons-Rubéole) - CONTRE-INDIQUÉ
  * Varicelle - CONTRE-INDIQUÉ
  * BCG - CONTRE-INDIQUÉ
  * Fièvre jaune - CONTRE-INDIQUÉ (sauf si voyage indispensable en zone à risque)

- VACCINS À ÉVITER SAUF NÉCESSITÉ :
  * HPV : non recommandé pendant la grossesse (reporter après l'accouchement)

- VACCINS POSSIBLES SI NÉCESSAIRES :
  * Hépatite A et B : possibles si exposition à risque
  * Méningocoque : possible si indication
  * Pneumocoque : possible si indication

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
  "nouveauxVaccins": [
    { "name": "Nom vaccin", "indication": "pour qui", "note": "explication" }
  ],
  "recommandations": ["conseil personnalisé 1", "conseil personnalisé 2"]
}`
          },
          {
            role: 'user',
            content: `Patient de ${age} ans, sexe: ${sex || 'non précisé'}${isPregnant ? ', ENCEINTE' : ''}.

VACCINS DÉJÀ RÉALISÉS ET À JOUR: ${completedVaccines && completedVaccines.length > 0 ? completedVaccines.join(', ') : 'aucun indiqué'}.

IMPORTANT: Les vaccins cochés ci-dessus signifient que le patient est À JOUR pour ces vaccins (y compris les rappels nécessaires pour son âge). Ne les mets PAS dans "enRetard".

${isPregnant ? `ATTENTION - PATIENTE ENCEINTE :
- Indique les vaccins RECOMMANDÉS pendant la grossesse (grippe, COVID, coqueluche entre 20-36 SA, VRS entre 32-36 SA)
- Indique les vaccins CONTRE-INDIQUÉS (ROR, varicelle, BCG, fièvre jaune)
- Indique les vaccins à REPORTER après l'accouchement (HPV)
- Adapte les recommandations en conséquence` : ''}

Analyse la situation vaccinale de ce patient selon le calendrier vaccinal français officiel 2024-2025:
- "enRetard": UNIQUEMENT les vaccins NON cochés qui auraient dû être faits et qui peuvent encore être rattrapés
- "aVenir": Les prochains vaccins/rappels à prévoir (y compris les futurs rappels des vaccins déjà faits)
- "nonRattrapables": Les vaccins NON cochés dont le délai est dépassé
- "recommandations": Conseils personnalisés adaptés au profil du patient`
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
