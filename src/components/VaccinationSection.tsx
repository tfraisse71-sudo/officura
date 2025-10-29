import { useState } from "react";
import { Syringe, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export const VaccinationSection = () => {
  const [age, setAge] = useState("");
  const [showResults, setShowResults] = useState(false);

  const vaccines = [
    { id: "dtcp", label: "DT-Coq-Polio" },
    { id: "haemophilus", label: "Haemophilus influenzae b" },
    { id: "hepatiteB", label: "Hépatite B" },
    { id: "pneumocoque", label: "Pneumocoque" },
    { id: "meningocoque", label: "Méningocoque C" },
    { id: "ror", label: "ROR (Rougeole-Oreillons-Rubéole)" },
    { id: "hpv", label: "HPV (Papillomavirus)" },
  ];

  const handleCalculate = () => {
    if (age) {
      setShowResults(true);
    }
  };

  // Mock data for demonstration
  const enRetard = showResults ? [
    { name: "DT-Coq-Polio - Rappel", dueAge: "6 ans", note: "Rappel obligatoire" },
    { name: "Méningocoque C", dueAge: "5 ans", note: "Dose unique" },
  ] : [];

  const aVenir = showResults ? [
    { name: "DT-Coq-Polio - Rappel", nextAge: "11-13 ans", note: "Rappel adolescent" },
    { name: "HPV", nextAge: "11-14 ans", note: "2 doses à 6 mois d'intervalle" },
  ] : [];

  return (
    <div className="space-y-6">
      <Card className="p-6 border-primary/20 shadow-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="age-input" className="block text-sm font-medium mb-2">
              Âge (années)
            </label>
            <div className="flex gap-2">
              <Input
                id="age-input"
                type="number"
                min="0"
                placeholder="Ex : 8"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={handleCalculate} className="gap-2">
                <Calendar className="h-4 w-4" />
                Calculer
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Vaccins déjà réalisés (optionnel)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vaccines.map((vaccine) => (
                <div key={vaccine.id} className="flex items-center space-x-2">
                  <Checkbox id={vaccine.id} />
                  <label
                    htmlFor={vaccine.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {vaccine.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {showResults && (
        <>
          {enRetard.length > 0 && (
            <Card className="p-6 shadow-md border-warning/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <h3 className="text-lg font-semibold">Vaccins en retard</h3>
                </div>
                <div className="space-y-3">
                  {enRetard.map((vaccine, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 bg-warning/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{vaccine.name}</p>
                        <p className="text-sm text-muted-foreground">Devait être fait à {vaccine.dueAge}</p>
                        {vaccine.note && (
                          <p className="text-sm text-muted-foreground mt-1">{vaccine.note}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="border-warning text-warning">
                        À rattraper
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {aVenir.length > 0 && (
            <Card className="p-6 shadow-md border-success/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <h3 className="text-lg font-semibold">Vaccins à venir</h3>
                </div>
                <div className="space-y-3">
                  {aVenir.map((vaccine, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 bg-success/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{vaccine.name}</p>
                        <p className="text-sm text-muted-foreground">Prévu à {vaccine.nextAge}</p>
                        {vaccine.note && (
                          <p className="text-sm text-muted-foreground mt-1">{vaccine.note}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="border-success text-success">
                        À prévoir
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 shadow-md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Syringe className="h-5 w-5 text-primary" />
                Calendrier vaccinal français
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Nourrisson (0-2 ans)</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 2 mois : DTP, Haemophilus, Pneumo, Hep B</li>
                      <li>• 4 mois : DTP, Haemophilus, Pneumo, Hep B</li>
                      <li>• 11 mois : DTP, Haemophilus, Pneumo, Hep B</li>
                      <li>• 12 mois : ROR, Méningo C</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Enfant et adolescent</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 6 ans : DTP</li>
                      <li>• 11-13 ans : DTP, HPV (2 doses)</li>
                      <li>• 16-18 ans : DTP</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Source : Calendrier vaccinal officiel - Santé publique France • Dernière MAJ : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </Card>
        </>
      )}

      {!showResults && (
        <Card className="p-8 text-center border-muted">
          <Syringe className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Entrez un âge pour calculer les vaccins en retard et à venir selon le calendrier vaccinal français.
          </p>
        </Card>
      )}
    </div>
  );
};
