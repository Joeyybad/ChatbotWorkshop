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


// Retourne les titres correspondant au mot-clé
app.get("/api/search-titles", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.json([]);

  try {
    const [rows] = await pool.query(
      "SELECT titre FROM chatbot_data WHERE titre LIKE ? OR texte LIKE ?",
      [`%${keyword}%`, `%${keyword}%`]
    );
    res.json(rows.map(r => r.titre)); // on ne renvoie que les titres
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
// Retourne le texte complet pour un titre donné
app.get("/api/get-text", async (req, res) => {
  const { titre } = req.query;
  if (!titre) return res.status(400).json({ error: "Titre manquant" });

  try {
    const [rows] = await pool.query(
      "SELECT texte FROM chatbot_data WHERE titre = ?",
      [titre]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Non trouvé" });

    let texte = rows[0].texte;
    try { texte = JSON.parse(texte); } catch {}
    res.json({ texte });
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
