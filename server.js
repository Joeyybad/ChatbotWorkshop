const express = require("express");
const path = require("path");
const { Op, fn, col, literal } = require("sequelize");
const { ListeFamille, ChatbotData, Contact } = require("./models"); // index.js généré par Sequelize CLI
const { contactValidationRules, validateContact } = require("./middlewares/validateContact");
const contactLimiter = require("./middlewares/contactLimiter");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    try { texte = JSON.parse(texte); } catch { }
    res.json({ texte });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ---------- Requête pour récupérer les familles et articles ----------
app.get("/api/familles-articles", async (req, res) => {
  try {
    const familles = await ListeFamille.findAll({
      include: [
        {
          model: ChatbotData,
          through: { attributes: [] }, // n'inclut pas la table de jointure
          attributes: ["id", "titre", "texte"]
        }
      ],
      attributes: ["id", "famille"],
      order: [["famille", "ASC"]]
    });

    // Transformer en [{ famille, articles: [...] }]
    const result = familles.map(f => ({
      famille: f.famille,
      articles: f.ChatbotData
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// ---------- requête pour récupèrer les formulaires des utilisateurs -------
app.post("/contact",
  contactLimiter,          // limite le nombre de requêtes par IP
  contactValidationRules,  // règles de validation avec express-validator
  validateContact,         // middleware qui renvoie les erreurs si présentes 
  async (req, res) => {
    try {
      const { lastname, name, NumeroDIP, sujet, message } = req.body;
      await Contact.create({
        lastname,
        firstname: name,
        numeroDIP: parseInt(NumeroDIP, 8),
        sujet,
        message
      });
      res.status(200).json({ success: true, message: "Merci pour votre contribution !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Erreur lors de l’enregistrement." });
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
