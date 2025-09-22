const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
app.use(express.json());

// Connexion à MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "nodeuser",
  password: "nodepassword",
  database: "chatbot",
});

// API : récupérer toutes les données
app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT titre, texte FROM chatbot_data");
    const data = {};
    rows.forEach(row => {
      data[row.titre] = row.texte;
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Servir le front
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log(" Serveur lancé sur http://localhost:3000");
});
