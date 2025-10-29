import { useState } from "react";
import { Pill, Calculator, Syringe, Plane } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MedicationSearch } from "@/components/MedicationSearch";
import { DosageSection } from "@/components/DosageSection";
import { VaccinationSection } from "@/components/VaccinationSection";
import { TravelSection } from "@/components/TravelSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MediSafe</h1>
                <p className="text-xs text-muted-foreground">Informations médicales officielles</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Version 1.0</p>
              <p className="text-xs text-muted-foreground">MAJ : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="medicament" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2">
            <TabsTrigger value="medicament" className="gap-2 py-3">
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">Recherche</span> Médicament
            </TabsTrigger>
            <TabsTrigger value="posologie" className="gap-2 py-3">
              <Calculator className="h-4 w-4" />
              Posologie
            </TabsTrigger>
            <TabsTrigger value="vaccins" className="gap-2 py-3">
              <Syringe className="h-4 w-4" />
              Mes Vaccins
            </TabsTrigger>
            <TabsTrigger value="voyage" className="gap-2 py-3">
              <Plane className="h-4 w-4" />
              Prévention Voyage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medicament" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Recherche Médicament</h2>
              <p className="text-muted-foreground">
                Consultez les contre-indications, informations grossesse/allaitement et interactions médicamenteuses.
              </p>
            </div>
            <MedicationSearch />
          </TabsContent>

          <TabsContent value="posologie" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Posologie</h2>
              <p className="text-muted-foreground">
                Consultez les posologies recommandées par tranche d'âge et de poids.
              </p>
            </div>
            <DosageSection />
          </TabsContent>

          <TabsContent value="vaccins" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Mes Vaccins</h2>
              <p className="text-muted-foreground">
                Vérifiez votre situation vaccinale selon le calendrier vaccinal français officiel.
              </p>
            </div>
            <VaccinationSection />
          </TabsContent>

          <TabsContent value="voyage" className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Prévention Voyage</h2>
              <p className="text-muted-foreground">
                Recommandations vaccinales et prophylaxies par pays de destination.
              </p>
            </div>
            <TravelSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <Card className="p-4 bg-muted/30 border-muted mb-4">
            <p className="text-sm text-center">
              <strong>Avertissement :</strong> MediSafe ne remplace pas l'avis d'un professionnel de santé. 
              Les informations présentées sont issues de sources officielles françaises (ANSM, CRAT, HAS, Santé publique France) 
              et sont fournies à titre indicatif.
            </p>
          </Card>
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>Sources : ANSM • CRAT • HAS • Santé publique France • OMS • Institut Pasteur</p>
            <p>© 2025 MediSafe • Application conforme RGPD • Aucune donnée personnelle collectée</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
