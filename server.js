const express = require("express");
const path = require("path");

const app = express();

// Middleware pour JSON
app.use(express.json());

// Servir le front
app.use(express.static(path.join(__dirname, "public")));

// Exemple d’API
app.get("/api/data", (req, res) => {
  res.json({
    parcours_professionnel: "Développeur web chez XYZ",
    formation: {
      diplome: "Bachelor Informatique",
      niveau: "Bac+3",
      lieu: "EPSI Lyon",
      organisme: "EPSI"
    }
  });
});

app.listen(3000, () => {
  console.log(" Serveur lancé sur http://localhost:3000");
});