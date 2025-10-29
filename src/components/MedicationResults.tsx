import { ExternalLink, Download, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getMedicationData } from "@/data/mockMedicationData";

interface MedicationResultsProps {
  medication1: string;
  medication2: string | null;
  mode: string;
}

export const MedicationResults = ({ medication1, medication2, mode }: MedicationResultsProps) => {
  const medicationInfo = getMedicationData(medication1);
  
  const getMockData = () => {
    if (!medicationInfo) {
      return {
        severity: "medium" as const,
        title: `Informations non disponibles pour ${medication1}`,
        summary: ["Les données pour ce médicament ne sont pas encore disponibles dans la base."],
        details: [],
        sources: [
          { name: "RCP ANSM", url: "https://ansm.sante.fr" },
        ],
      };
    }

    switch (mode) {
      case "contre-indications":
        return {
          severity: medicationInfo.contraindications.severity,
          title: `Contre-indications de ${medicationInfo.name}`,
          summary: medicationInfo.contraindications.summary,
          details: medicationInfo.contraindications.details,
          sources: [
            { name: "RCP ANSM", url: "https://ansm.sante.fr" },
            { name: "Notice", url: "https://ansm.sante.fr" },
          ],
        };
      case "grossesse":
        return {
          severity: medicationInfo.pregnancy.severity,
          title: `${medicationInfo.name} - Utilisation pendant la grossesse`,
          summary: medicationInfo.pregnancy.summary,
          details: medicationInfo.pregnancy.details,
          sources: [
            { name: "CRAT", url: "https://www.lecrat.fr" },
            { name: "RCP ANSM", url: "https://ansm.sante.fr" },
          ],
        };
      case "allaitement":
        return {
          severity: medicationInfo.breastfeeding.severity,
          title: `${medicationInfo.name} - Utilisation pendant l'allaitement`,
          summary: medicationInfo.breastfeeding.summary,
          details: medicationInfo.breastfeeding.details,
          sources: [
            { name: "CRAT", url: "https://www.lecrat.fr" },
          ],
        };
      case "interactions":
        return {
          severity: medication2 ? "high" as const : "low" as const,
          title: medication2 
            ? `Interactions entre ${medicationInfo.name} et ${medication2}`
            : "Sélectionnez un deuxième médicament",
          summary: medication2 ? [
            "Association déconseillée",
            "Risque hémorragique augmenté",
            "Surveillance biologique rapprochée nécessaire",
          ] : [],
          details: medication2 ? [
            {
              title: "Mécanisme",
              content: "Potentialisation de l'effet anticoagulant avec augmentation du risque hémorragique.",
            },
            {
              title: "Conduite à tenir",
              content: "Si l'association ne peut être évitée : surveillance clinique étroite et contrôle biologique de l'INR plus fréquent.",
            },
          ] : [],
          sources: medication2 ? [
            { name: "Thesaurus ANSM", url: "https://ansm.sante.fr/thesaurus" },
          ] : [],
        };
      default:
        return null;
    }
  };

  const data = getMockData();
  if (!data) return null;

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-severity-critical text-white">CI Absolue</Badge>;
      case "high":
        return <Badge className="bg-severity-high text-white">Association déconseillée</Badge>;
      case "medium":
        return <Badge className="bg-severity-medium text-white">Prudence</Badge>;
      case "low":
        return <Badge className="bg-severity-low text-white">Précaution</Badge>;
      case "safe":
        return <Badge className="bg-severity-safe text-white">Compatible</Badge>;
      default:
        return null;
    }
  };

  if (mode === "interactions" && !medication2) {
    return (
      <Card className="p-8 text-center border-muted">
        <p className="text-muted-foreground">
          Veuillez sélectionner un deuxième médicament pour vérifier les interactions.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 shadow-md">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
              {getSeverityBadge(data.severity)}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </div>

          {data.summary.length > 0 && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium mb-2">Points clés</h4>
              <ul className="space-y-1">
                {data.summary.map((item, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.details.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {data.details.map((detail, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {detail.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">{detail.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-sm font-medium">Sources officielles</h4>
            <div className="flex flex-wrap gap-2">
              {data.sources.map((source, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  asChild
                >
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                    {source.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Clock className="h-3 w-3" />
            <span>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
