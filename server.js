const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());

//<------- Connexion à MySQL via env  ------>
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//<-----Retourne les titres correspondant au mot------->
/* ALTER TABLE chatbot_data
ADD FULLTEXT idx_fulltext_texte (texte); */
//Get routing
app.get("/api/search-titles", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.json([]);
  try {
    const [rows] = await pool.query(
      `SELECT id, titre, texte, 
              MATCH(texte) AGAINST(? IN NATURAL LANGUAGE MODE) AS score
       FROM chatbot_data
       WHERE titre LIKE ?
          OR MATCH(texte) AGAINST(? IN NATURAL LANGUAGE MODE)
       ORDER BY score DESC
       LIMIT 15`,
      [keyword, `%${keyword}%`, keyword]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

//<------- Retourne le texte complet pour un titre donné -------> 

//Get routing 
app.get("/api/get-text", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "ID manquant" });

  try {
    const [rows] = await pool.query(
      "SELECT texte FROM chatbot_data WHERE id = ?",
      [id]
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


// <-----Servir le front------>
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log(" Serveur lancé sur http://localhost:3000");
});
