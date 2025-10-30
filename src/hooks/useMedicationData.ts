import { useState, useEffect } from "react";

export const useMedicationData = () => {
  const [medications, setMedications] = useState<string[]>([]);

  useEffect(() => {
    // Load medication data from CSV
    fetch('/medicaments.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').slice(1); // Skip header
        const medList = lines
          .map(line => line.trim().replace(/^"|"$/g, '')) // Remove quotes
          .filter(line => line.length > 0);
        setMedications(medList);
      })
      .catch(error => {
        console.error('Error loading medication data:', error);
        // Fallback to some basic medications
        setMedications([
          "Paracétamol",
          "Ibuprofène",
          "Amoxicilline",
          "Doliprane",
          "Efferalgan",
          "Aspirine",
          "Warfarine",
        ]);
      });
  }, []);

  return medications;
};
