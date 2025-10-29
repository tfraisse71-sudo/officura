import { useState, useMemo } from "react";
import { Globe, AlertTriangle, Syringe, Shield, Droplets, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const TravelSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    "Sénégal", "Kenya", "Thaïlande", "Brésil", "Inde", "Maroc", "Égypte", 
    "Madagascar", "Indonésie", "Vietnam", "Tanzanie", "Pérou"
  ];

  const suggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return countries.filter(country => 
      country.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setSearchTerm(country);
    setShowSuggestions(false);
  };

  // Mock travel data
  const travelData = selectedCountry ? {
    country: selectedCountry,
    vaccinsObligatoires: [
      { name: "Fièvre jaune", note: "Obligatoire pour l'entrée sur le territoire" }
    ],
    vaccinsRecommandes: [
      { name: "Hépatite A", note: "Fortement recommandé" },
      { name: "Hépatite B", note: "Pour séjours longs ou répétés" },
      { name: "Typhoïde", note: "Si conditions d'hygiène précaires" },
      { name: "Méningite A+C+Y+W135", note: "Pendant la saison sèche" },
    ],
    prophylaxies: [
      {
        name: "Paludisme",
        zone: "Présent toute l'année",
        traitement: "Atovaquone-Proguanil (Malarone) ou Doxycycline",
        duree: "Débuter 1-2 jours avant, pendant et 7 jours après le séjour",
        contrindications: "CI : grossesse pour Doxycycline",
      }
    ],
    conseils: [
      "Protection contre les moustiques (répulsifs, moustiquaires)",
      "Eau : boire uniquement de l'eau en bouteille capsulée",
      "Hygiène alimentaire : éviter crudités et fruits non pelés",
      "Prévoir une pharmacie de voyage",
      "Souscrire une assurance rapatriement",
    ],
  } : null;

  return (
    <div className="space-y-6">
      <Card className="p-6 border-primary/20 shadow-md">
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="country-search" className="block text-sm font-medium mb-2">
              Pays de destination
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="country-search"
                type="text"
                placeholder="Ex : Sénégal, Kenya..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pl-10"
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto">
                {suggestions.map((country, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectCountry(country)}
                    className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors text-sm"
                  >
                    {country}
                  </button>
                ))}
              </Card>
            )}
          </div>
        </div>
      </Card>

      {travelData && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md border-destructive/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="text-lg font-semibold">Vaccinations obligatoires</h3>
              </div>
              <div className="space-y-3">
                {travelData.vaccinsObligatoires.map((vaccine, idx) => (
                  <div key={idx} className="p-3 bg-destructive/5 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{vaccine.name}</p>
                        <p className="text-sm text-muted-foreground">{vaccine.note}</p>
                      </div>
                      <Badge className="bg-destructive">Obligatoire</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md border-warning/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-warning" />
                <h3 className="text-lg font-semibold">Vaccinations recommandées</h3>
              </div>
              <div className="space-y-2">
                {travelData.vaccinsRecommandes.map((vaccine, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 bg-warning/5 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{vaccine.name}</p>
                      <p className="text-xs text-muted-foreground">{vaccine.note}</p>
                    </div>
                    <Badge variant="outline" className="border-warning text-warning text-xs">
                      Recommandé
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {travelData.prophylaxies.length > 0 && (
            <Card className="p-6 shadow-md border-primary/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Prophylaxies antipaludiques</h3>
                </div>
                {travelData.prophylaxies.map((prophylaxie, idx) => (
                  <div key={idx} className="space-y-3 p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="font-medium">{prophylaxie.name}</p>
                      <p className="text-sm text-muted-foreground">{prophylaxie.zone}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Traitement : </span>
                        <span>{prophylaxie.traitement}</span>
                      </div>
                      <div>
                        <span className="font-medium">Durée : </span>
                        <span>{prophylaxie.duree}</span>
                      </div>
                      <div className="text-destructive">
                        <span className="font-medium">⚠️ </span>
                        <span>{prophylaxie.contrindications}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-6 shadow-md">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold">Conseils pratiques</h3>
              </div>
              <ul className="space-y-2">
                {travelData.conseils.map((conseil, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{conseil}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Sources : Santé publique France, OMS, Institut Pasteur, Ministère des Affaires étrangères • 
                Dernière MAJ : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-muted/30 border-muted">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Ces recommandations ne remplacent pas une consultation en médecine des voyages. 
                Consultez un professionnel de santé 4 à 6 semaines avant le départ.
              </p>
            </div>
          </Card>
        </div>
      )}

      {!selectedCountry && (
        <Card className="p-8 text-center border-muted">
          <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Recherchez un pays de destination pour obtenir les recommandations vaccinales et de prévention.
          </p>
        </Card>
      )}
    </div>
  );
};
