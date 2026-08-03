import React from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import "../app/globals.css";

const schema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "[BEDRIJFSNAAM]",
  areaServed: ["Hilversum", "Bussum", "Naarden", "Huizen", "Laren", "Blaricum", "Eemnes"],
  description: "Taxivervoer in ’t Gooi en omgeving.",
};

const schemaElement = document.createElement("script");
schemaElement.type = "application/ld+json";
schemaElement.text = JSON.stringify(schema);
document.head.appendChild(schemaElement);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
