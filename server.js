const express = require("express");
const path = require("path");
const { Op, fn, col, literal } = require("sequelize");
<<<<<<< HEAD
const { Formation, InscritFormation, ListeFamille, ChatbotData, Contact } = require("./models"); // index.js généré par Sequelize CLI
=======
const { ListeFamille, ChatbotData, Contact, User} = require("./models"); // index.js généré par Sequelize CLI
>>>>>>> jordan
const { contactValidationRules, validateContact } = require("./middlewares/validateContact");
const { userValidationRules, validateUser } = require("./middlewares/validateRegister");
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
        "id", "titre",
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

// ---------- Requête familles + articles ----------
app.get("/api/familles-articles", async (req, res) => {
  try {
    const familles = await ListeFamille.findAll({
      include: [
        {
          model: ChatbotData,
          through: { attributes: [] }, // n'inclut pas la table de jointure
          attributes: ["id", "titre", "texte", "updated_at"]
        }
      ],
      attributes: ["id", "famille"],
      order: [["famille", "ASC"]]
    });

    // Transformer en [{ famille, articles: [...] }]
    const result = familles.map(f => ({
      id: f.id,
      famille: f.famille,
      articles: f.ChatbotData,
      count: f.ChatbotData.length
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ---------- requête pour récupèrer les formulaires des utilisateurs -------
app.post("/api/contact",
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

// ---------- Requête articles par date de modification ----------
app.get("/api/select-titre-updated", async (req, res) => {
  try {
    const result = await ChatbotData.findAll({
      include: [
        {
          model: ListeFamille,
          through: { attributes: [] }, // n'inclut pas la table de jointure
          attributes: ["famille"]
        }
      ],
      attributes: [
        "id", "titre", "updated_at"
      ],
      order: [["updated_at", "DESC"]],
      limit: 50
    });

    const results = result.map(r => ({
      id: r.id,
      titre: r.titre,
      updated_at: r.updated_at,
      famille: r.ListeFamille
    }));

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

<<<<<<< HEAD
// --- Récuppérer la liste des formations ---
app.get('/api/formations', async (req, res) => {
  try {
    const categorieId = req.query.categorie || null;
    const userId = req.query.user || null;

    const whereClause = {};
    if (categorieId) {
      whereClause.categorie_id = categorieId;
    }

    const includeClause = [
      {
        model: InscritFormation,
        as: 'inscriptions',
        // Si userId est passé, on filtre ici
        where: userId ? { utilisateur_id: userId } : undefined,
        required: !!userId // si true => ramène seulement les formations avec cet inscrit
      }
    ];

    const formations = await Formation.findAll({
      where: whereClause,
      include: includeClause,
      order: [['date', 'ASC']]
    });

    res.json(formations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// --- Récupération des familles/catégories ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await ListeFamille.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// --- Inscription à une formation ---
app.post('/formations/inscription/:id', async (req, res) => {
  try {
    const formationId = req.params.id;
    const utilisateurId = 1; // à remplacer par l'utilisateur connecté

    const dejaInscrit = await InscritFormation.findOne({
      where: { cours_id: formationId, utilisateur_id: utilisateurId }
    });

    if (dejaInscrit) return res.status(400).send('Déjà inscrit');

    await InscritFormation.create({
      cours_id: formationId,
      utilisateur_id: utilisateurId
    });

    res.status(200).send('Inscrit avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// ---------- Servir le front ----------
app.use(express.static(path.join(__dirname, "public")));
=======
// ---------- requête pour inscrire les utilisateurs -------
app.post(
  "/api/user/register",
  userValidationRules,
  validateUser,
  async (req, res) => {
    try {
      const { password, firstname, lastname, birthdate, city } = req.body;
>>>>>>> jordan

      // Générer un DIP unique à 8 chiffres
      let numeroDIP;
      let exists = true;
      while (exists) {
        numeroDIP = Math.floor(10000000 + Math.random() * 90000000); // 8 chiffres
        const userWithSameDIP = await User.findOne({ where: { numeroDIP } });
        if (!userWithSameDIP) exists = false;
      }

      // Créer l’utilisateur
      const createdUser = await User.create({
        numeroDIP,
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        birthdate: birthdate.trim(),
        city: city.trim(),
        password: password.trim(), // hashé automatiquement via hook dans le modèle
      });

      return res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès !",
        userId: createdUser.id,
        numeroDIP: createdUser.numeroDIP, // on renvoie le DIP pour que l’utilisateur puisse s’en souvenir
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors de l'inscription.",
      });
    }
  }
);



// Rediriger la racine vers auth.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// Route pour accéder directement à index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Servir les fichiers statiques après
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
