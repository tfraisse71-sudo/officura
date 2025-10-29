// Base de données mockée pour différents médicaments
// Dans une vraie application, ces données viendraient des APIs ANSM/CRAT

export interface MedicationInfo {
  name: string;
  contraindications: {
    severity: "critical" | "high" | "medium" | "low" | "safe";
    summary: string[];
    details: { title: string; content: string }[];
  };
  pregnancy: {
    severity: "critical" | "high" | "medium" | "low" | "safe";
    summary: string[];
    details: { title: string; content: string }[];
  };
  breastfeeding: {
    severity: "critical" | "high" | "medium" | "low" | "safe";
    summary: string[];
    details: { title: string; content: string }[];
  };
  dosages: {
    age: string;
    poids: string;
    voie: string;
    dosePrise: string;
    frequence: string;
    doseMaxPrise: string;
    doseMax24h: string;
    notes: string;
  }[];
}

export const medicationDatabase: Record<string, MedicationInfo> = {
  "paracétamol": {
    name: "Paracétamol",
    contraindications: {
      severity: "medium",
      summary: [
        "Hypersensibilité au paracétamol ou aux excipients",
        "Insuffisance hépatocellulaire sévère",
        "Risque de toxicité en cas d'alcoolisme chronique",
      ],
      details: [
        {
          title: "Contre-indications absolues",
          content: "Hypersensibilité connue au paracétamol. Insuffisance hépatocellulaire sévère.",
        },
        {
          title: "Mises en garde",
          content: "Prudence en cas d'insuffisance rénale ou hépatique. Ne pas dépasser 3g/jour chez l'adulte en cas d'insuffisance hépatique légère. Risque de toxicité hépatique en cas de surdosage.",
        },
      ],
    },
    pregnancy: {
      severity: "safe",
      summary: [
        "Utilisable pendant toute la grossesse",
        "Pas d'effet malformatif ou fœtotoxique démontré",
        "Données cliniques rassurantes sur plusieurs milliers de grossesses",
      ],
      details: [
        {
          title: "Conclusion CRAT",
          content: "Le paracétamol peut être utilisé quel que soit le terme de la grossesse. Privilégier la dose efficace la plus faible pendant la durée la plus courte possible.",
        },
      ],
    },
    breastfeeding: {
      severity: "safe",
      summary: [
        "Compatible avec l'allaitement",
        "Passage dans le lait maternel en très faible quantité",
        "Aucun effet indésirable rapporté chez les nourrissons allaités",
      ],
      details: [
        {
          title: "Données CRAT",
          content: "Le paracétamol est compatible avec l'allaitement aux posologies usuelles. C'est l'antalgique de référence chez la femme qui allaite.",
        },
      ],
    },
    dosages: [
      {
        age: "< 3 mois",
        poids: "< 5 kg",
        voie: "Orale",
        dosePrise: "10-15 mg/kg",
        frequence: "3-4 fois/j",
        doseMaxPrise: "15 mg/kg",
        doseMax24h: "60 mg/kg",
        notes: "Avis médical requis",
      },
      {
        age: "3-12 mois",
        poids: "5-10 kg",
        voie: "Orale",
        dosePrise: "60-120 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "120 mg",
        doseMax24h: "480 mg",
        notes: "Intervalle minimum 4h",
      },
      {
        age: "1-5 ans",
        poids: "10-20 kg",
        voie: "Orale",
        dosePrise: "120-240 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "240 mg",
        doseMax24h: "960 mg",
        notes: "",
      },
      {
        age: "6-12 ans",
        poids: "20-40 kg",
        voie: "Orale",
        dosePrise: "240-480 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "480 mg",
        doseMax24h: "2000 mg",
        notes: "",
      },
      {
        age: "> 12 ans",
        poids: "> 40 kg",
        voie: "Orale",
        dosePrise: "500-1000 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "1000 mg",
        doseMax24h: "4000 mg",
        notes: "Ne pas dépasser 3g/j en cas d'insuffisance hépatique",
      },
    ],
  },
  "ibuprofène": {
    name: "Ibuprofène",
    contraindications: {
      severity: "high",
      summary: [
        "Contre-indiqué à partir du 6ème mois de grossesse",
        "Ulcère gastroduodénal évolutif",
        "Insuffisance hépatique, rénale ou cardiaque sévère",
        "Hypersensibilité aux AINS",
      ],
      details: [
        {
          title: "Contre-indications absolues",
          content: "Antécédent d'allergie aux AINS, ulcère gastroduodénal évolutif, insuffisance hépatique sévère, insuffisance rénale sévère, insuffisance cardiaque non contrôlée, 3ème trimestre de grossesse.",
        },
        {
          title: "Mises en garde",
          content: "Risque d'hémorragie digestive. Surveillance en cas d'insuffisance rénale ou cardiaque. Éviter l'utilisation prolongée sans surveillance médicale.",
        },
      ],
    },
    pregnancy: {
      severity: "critical",
      summary: [
        "CONTRE-INDIQUÉ à partir du 6ème mois (24 SA)",
        "Déconseillé avant le 6ème mois",
        "Risque de toxicité fœtale et néonatale",
      ],
      details: [
        {
          title: "Conclusion CRAT",
          content: "Les AINS sont formellement contre-indiqués à partir de 24 semaines d'aménorrhée (début du 6ème mois). Avant ce terme, ils sont déconseillés. Risque de fermeture prématurée du canal artériel, d'insuffisance rénale fœtale.",
        },
      ],
    },
    breastfeeding: {
      severity: "medium",
      summary: [
        "Utilisation ponctuelle possible",
        "Éviter les traitements prolongés",
        "Préférer le paracétamol si possible",
      ],
      details: [
        {
          title: "Données CRAT",
          content: "L'ibuprofène est compatible avec l'allaitement en utilisation ponctuelle et à dose antalgique. Pour un traitement prolongé, préférer le paracétamol.",
        },
      ],
    },
    dosages: [
      {
        age: "3-6 mois",
        poids: "5-7.5 kg",
        voie: "Orale",
        dosePrise: "20 mg/kg/j",
        frequence: "3 prises/j",
        doseMaxPrise: "50 mg",
        doseMax24h: "60 mg",
        notes: "Sur avis médical uniquement",
      },
      {
        age: "6 mois-3 ans",
        poids: "7.5-15 kg",
        voie: "Orale",
        dosePrise: "20-30 mg/kg/j",
        frequence: "3-4 prises/j",
        doseMaxPrise: "100 mg",
        doseMax24h: "400 mg",
        notes: "Intervalle minimum 6h",
      },
      {
        age: "3-12 ans",
        poids: "15-40 kg",
        voie: "Orale",
        dosePrise: "20-30 mg/kg/j",
        frequence: "3-4 prises/j",
        doseMaxPrise: "300 mg",
        doseMax24h: "1200 mg",
        notes: "Intervalle minimum 6h",
      },
      {
        age: "> 12 ans",
        poids: "> 40 kg",
        voie: "Orale",
        dosePrise: "200-400 mg",
        frequence: "3 fois/j",
        doseMaxPrise: "400 mg",
        doseMax24h: "1200 mg",
        notes: "Maximum 2400 mg/j sur avis médical",
      },
    ],
  },
  "amoxicilline": {
    name: "Amoxicilline",
    contraindications: {
      severity: "high",
      summary: [
        "Hypersensibilité aux pénicillines",
        "Antécédent d'allergie grave aux bêta-lactamines",
        "Mononucléose infectieuse (risque d'éruption cutanée)",
      ],
      details: [
        {
          title: "Contre-indications absolues",
          content: "Allergie aux pénicillines ou aux bêta-lactamines. En cas de mononucléose infectieuse avérée ou suspectée (risque d'éruption morbilliforme).",
        },
        {
          title: "Mises en garde",
          content: "Surveillance rénale en cas d'insuffisance rénale. Risque de diarrhées associées aux antibiotiques. Adaptation posologique nécessaire si clairance < 30 ml/min.",
        },
      ],
    },
    pregnancy: {
      severity: "safe",
      summary: [
        "Utilisable pendant toute la grossesse",
        "Recul d'utilisation important et rassurant",
        "Antibiotique de référence chez la femme enceinte",
      ],
      details: [
        {
          title: "Conclusion CRAT",
          content: "L'amoxicilline peut être utilisée quel que soit le terme de la grossesse. Les données disponibles sont très nombreuses et rassurantes.",
        },
      ],
    },
    breastfeeding: {
      severity: "safe",
      summary: [
        "Compatible avec l'allaitement",
        "Passage minime dans le lait maternel",
        "Surveillance digestive du nourrisson",
      ],
      details: [
        {
          title: "Données CRAT",
          content: "L'amoxicilline est compatible avec l'allaitement. Surveiller l'apparition de diarrhées ou muguet chez le nourrisson.",
        },
      ],
    },
    dosages: [
      {
        age: "< 30 mois",
        poids: "< 15 kg",
        voie: "Orale",
        dosePrise: "40-90 mg/kg/j",
        frequence: "2-3 prises/j",
        doseMaxPrise: "50 mg/kg",
        doseMax24h: "100 mg/kg",
        notes: "Selon infection",
      },
      {
        age: "30 mois-15 ans",
        poids: "15-40 kg",
        voie: "Orale",
        dosePrise: "40-90 mg/kg/j",
        frequence: "2-3 prises/j",
        doseMaxPrise: "1500 mg",
        doseMax24h: "3000 mg",
        notes: "Selon infection",
      },
      {
        age: "> 15 ans",
        poids: "> 40 kg",
        voie: "Orale",
        dosePrise: "1-3 g/j",
        frequence: "2-3 prises/j",
        doseMaxPrise: "1000 mg",
        doseMax24h: "3000 mg",
        notes: "Jusqu'à 6g/j dans infections sévères",
      },
    ],
  },
  "aspirine": {
    name: "Aspirine (Acide acétylsalicylique)",
    contraindications: {
      severity: "high",
      summary: [
        "Ulcère gastroduodénal en évolution",
        "Syndrome hémorragique constitutionnel ou acquis",
        "Insuffisance hépatique ou rénale sévère",
        "Grossesse à partir du 6ème mois",
      ],
      details: [
        {
          title: "Contre-indications absolues",
          content: "Ulcère gastroduodénal évolutif, maladie hémorragique, insuffisance hépatique ou rénale sévère, enfant de moins de 6 ans (risque de syndrome de Reye), 3ème trimestre de grossesse.",
        },
        {
          title: "Mises en garde",
          content: "Risque hémorragique augmenté. Surveillance en cas de traitement anticoagulant associé. Déconseillé en cas d'antécédent d'asthme induit par les salicylés.",
        },
      ],
    },
    pregnancy: {
      severity: "critical",
      summary: [
        "CONTRE-INDIQUÉ à partir du 6ème mois",
        "Déconseillé avant (sauf indication obstétricale)",
        "Risque de toxicité cardio-pulmonaire et rénale fœtale",
      ],
      details: [
        {
          title: "Conclusion CRAT",
          content: "L'aspirine à dose antalgique est contre-indiquée à partir de 24 SA. Avant ce terme, elle est déconseillée sauf indication obstétricale spécifique (aspirine à faible dose).",
        },
      ],
    },
    breastfeeding: {
      severity: "medium",
      summary: [
        "Utilisation ponctuelle acceptable",
        "Éviter les prises répétées",
        "Préférer le paracétamol",
      ],
      details: [
        {
          title: "Données CRAT",
          content: "L'aspirine en prise ponctuelle est compatible avec l'allaitement. Pour un traitement prolongé, préférer le paracétamol.",
        },
      ],
    },
    dosages: [
      {
        age: "6-12 ans",
        poids: "20-30 kg",
        voie: "Orale",
        dosePrise: "10-15 mg/kg",
        frequence: "4-6 fois/j",
        doseMaxPrise: "500 mg",
        doseMax24h: "80 mg/kg",
        notes: "Éviter si possible (Reye)",
      },
      {
        age: "12-16 ans",
        poids: "30-50 kg",
        voie: "Orale",
        dosePrise: "250-500 mg",
        frequence: "4-6 fois/j",
        doseMaxPrise: "500 mg",
        doseMax24h: "3000 mg",
        notes: "Intervalle minimum 4h",
      },
      {
        age: "> 16 ans",
        poids: "> 50 kg",
        voie: "Orale",
        dosePrise: "500-1000 mg",
        frequence: "4-6 fois/j",
        doseMaxPrise: "1000 mg",
        doseMax24h: "4000 mg",
        notes: "Intervalle minimum 4h",
      },
    ],
  },
  "doliprane": {
    name: "Doliprane (Paracétamol)",
    contraindications: {
      severity: "medium",
      summary: [
        "Hypersensibilité au paracétamol ou aux excipients",
        "Insuffisance hépatocellulaire sévère",
        "Risque de toxicité en cas d'alcoolisme chronique",
      ],
      details: [
        {
          title: "Contre-indications absolues",
          content: "Hypersensibilité connue au paracétamol. Insuffisance hépatocellulaire sévère.",
        },
        {
          title: "Mises en garde",
          content: "Prudence en cas d'insuffisance rénale ou hépatique. Ne pas dépasser 3g/jour chez l'adulte en cas d'insuffisance hépatique légère. Risque de toxicité hépatique en cas de surdosage.",
        },
      ],
    },
    pregnancy: {
      severity: "safe",
      summary: [
        "Utilisable pendant toute la grossesse",
        "Pas d'effet malformatif ou fœtotoxique démontré",
        "Données cliniques rassurantes sur plusieurs milliers de grossesses",
      ],
      details: [
        {
          title: "Conclusion CRAT",
          content: "Le paracétamol peut être utilisé quel que soit le terme de la grossesse. Privilégier la dose efficace la plus faible pendant la durée la plus courte possible.",
        },
      ],
    },
    breastfeeding: {
      severity: "safe",
      summary: [
        "Compatible avec l'allaitement",
        "Passage dans le lait maternel en très faible quantité",
        "Aucun effet indésirable rapporté chez les nourrissons allaités",
      ],
      details: [
        {
          title: "Données CRAT",
          content: "Le paracétamol est compatible avec l'allaitement aux posologies usuelles. C'est l'antalgique de référence chez la femme qui allaite.",
        },
      ],
    },
    dosages: [
      {
        age: "< 3 mois",
        poids: "< 5 kg",
        voie: "Orale",
        dosePrise: "10-15 mg/kg",
        frequence: "3-4 fois/j",
        doseMaxPrise: "15 mg/kg",
        doseMax24h: "60 mg/kg",
        notes: "Avis médical requis",
      },
      {
        age: "3-12 mois",
        poids: "5-10 kg",
        voie: "Orale",
        dosePrise: "60-120 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "120 mg",
        doseMax24h: "480 mg",
        notes: "Intervalle minimum 4h",
      },
      {
        age: "1-5 ans",
        poids: "10-20 kg",
        voie: "Orale",
        dosePrise: "120-240 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "240 mg",
        doseMax24h: "960 mg",
        notes: "",
      },
      {
        age: "6-12 ans",
        poids: "20-40 kg",
        voie: "Orale",
        dosePrise: "240-480 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "480 mg",
        doseMax24h: "2000 mg",
        notes: "",
      },
      {
        age: "> 12 ans",
        poids: "> 40 kg",
        voie: "Orale",
        dosePrise: "500-1000 mg",
        frequence: "4 fois/j",
        doseMaxPrise: "1000 mg",
        doseMax24h: "4000 mg",
        notes: "Ne pas dépasser 3g/j en cas d'insuffisance hépatique",
      },
    ],
  },
};

// Fonction pour trouver les données d'un médicament (avec normalisation)
export const getMedicationData = (medicationName: string): MedicationInfo | null => {
  const normalized = medicationName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  
  // Recherche directe
  for (const [key, data] of Object.entries(medicationDatabase)) {
    const normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedKey === normalized || normalized.includes(normalizedKey)) {
      return data;
    }
  }
  
  // Recherche par nom de marque (Doliprane = Paracétamol)
  const brandMapping: Record<string, string> = {
    "doliprane": "paracétamol",
    "efferalgan": "paracétamol",
    "dafalgan": "paracétamol",
    "advil": "ibuprofène",
    "nurofen": "ibuprofène",
    "spedifen": "ibuprofène",
    "clamoxyl": "amoxicilline",
    "aspegic": "aspirine",
    "kardegic": "aspirine",
  };
  
  for (const [brand, dci] of Object.entries(brandMapping)) {
    if (normalized.includes(brand)) {
      return medicationDatabase[dci] || null;
    }
  }
  
  return null;
};
