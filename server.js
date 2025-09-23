const express = require("express");
const path = require("path");
const { Op, fn, col, literal } = require("sequelize");
const { ChatbotData } = require("./models"); // index.js généré par Sequelize CLI

const app = express();
app.use(express.json());

// ---------- Requête de recherche ----------
app.get("/api/search-titles", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.json([]);

  try {
    const results = await ChatbotData.findAll({
      where: {
        [Op.or]: [
          { titre: { [Op.like]: `%${keyword}%` } },
          literal(`MATCH(texte) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`)
        ]
      },
      attributes: [
        "id", "titre", "texte",
        [literal(`MATCH(texte) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`), "score"]
      ],
      order: [[literal("score"), "DESC"]],
      limit: 15
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ---------- Requête texte complet ----------
app.get("/api/get-text", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "ID manquant" });

  try {
    const article = await ChatbotData.findByPk(id);

    if (!article) return res.status(404).json({ error: "Non trouvé" });

    let texte = article.texte;
    try { texte = JSON.parse(texte); } catch {}
    res.json({ texte });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ---------- Servir le front ----------
app.use(express.static(path.join(__dirname, "public")));

// Exemple de route pour ta page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
