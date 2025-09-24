"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Formations", [
      {
        id: 1,
        titre: "Agriculture Urbaine Durable",
        description: "Maîtrisez les techniques de culture en milieu urbain pour assurer l'autonomie alimentaire.",
        date: "2025-10-01",
        createur_id: 1,
        categorie_id: 6,
        duree: 12, 
        difficulte: "Débutant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        titre: "Sécurité Informatique Post-Ultron",
        description: "Apprenez les techniques de protection contre les attaques d'IA et de virus informatiques avancés.",
        date: "2025-11-15",
        createur_id: 2,
        categorie_id: 5,
        duree: 20, 
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        titre: "Purification de l’Eau de Surface",
        description: "Techniques simples pour transformer l’eau des rivières et flaques contaminées en eau potable.",
        date: "2025-12-01",
        createur_id: 3,
        categorie_id: 1,
        duree: 8,
        difficulte: "Débutant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        titre: "Systèmes de Récupération d’Eau de Pluie",
        description: "Construisez des installations durables pour capter et stocker l’eau de pluie.",
        date: "2026-01-10",
        createur_id: 4,
        categorie_id: 1,
        duree: 10,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        titre: "Conservation des Aliments Sans Électricité",
        description: "Méthodes ancestrales de séchage, fumage et fermentation pour stocker vos réserves.",
        date: "2025-10-20",
        createur_id: 2,
        categorie_id: 2,
        duree: 14,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        titre: "Chasse et Pièges de Survie",
        description: "Fabriquez des pièges rudimentaires et apprenez les bases de la chasse en terrain hostile.",
        date: "2025-12-05",
        createur_id: 5,
        categorie_id: 2,
        duree: 16,
        difficulte: "Expert",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        titre: "Médecine Naturelle et Plantes Médicinales",
        description: "Identifiez et utilisez les plantes locales pour soigner blessures et maladies courantes.",
        date: "2026-01-15",
        createur_id: 6,
        categorie_id: 3,
        duree: 12,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        titre: "Hygiène en Conditions Extrêmes",
        description: "Prévenir les épidémies grâce à des pratiques d’hygiène adaptées à un monde détruit.",
        date: "2025-11-02",
        createur_id: 3,
        categorie_id: 3,
        duree: 6,
        difficulte: "Débutant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        titre: "Électricité de Fortune",
        description: "Apprenez à générer du courant avec des matériaux récupérés : dynamo, batteries, panneaux solaires bricolés.",
        date: "2026-02-20",
        createur_id: 7,
        categorie_id: 4,
        duree: 18,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        titre: "Feu et Lumière Sans Essence",
        description: "Méthodes primitives et modernes pour produire feu et lumière dans le noir absolu.",
        date: "2025-12-18",
        createur_id: 8,
        categorie_id: 4,
        duree: 10,
        difficulte: "Débutant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        titre: "Stratégies de Défense de Campement",
        description: "Apprenez à sécuriser un périmètre avec peu de ressources face aux pillards et créatures.",
        date: "2025-11-28",
        createur_id: 9,
        categorie_id: 5,
        duree: 15,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        titre: "Fabrication d’Armes Improvisées",
        description: "Transformez les déchets métalliques et bois trouvés en armes efficaces.",
        date: "2026-01-30",
        createur_id: 10,
        categorie_id: 5,
        duree: 20,
        difficulte: "Expert",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        titre: "Gestion d’une Communauté Survivante",
        description: "Organiser les rôles, répartir les ressources et maintenir la cohésion dans un groupe post-guerre.",
        date: "2025-12-22",
        createur_id: 1,
        categorie_id: 6,
        duree: 12,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        titre: "Techniques de Négociation et Troc",
        description: "Apprenez à échanger vos biens et à négocier dans un monde où la monnaie n’existe plus.",
        date: "2026-02-10",
        createur_id: 4,
        categorie_id: 6,
        duree: 8,
        difficulte: "Débutant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        titre: "Reconnaissance de Plantes Comestibles",
        description: "Identifiez les plantes sauvages utiles à la survie dans un environnement dévasté.",
        date: "2025-11-08",
        createur_id: 2,
        categorie_id: 7,
        duree: 10,
        difficulte: "Débutant",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        titre: "Écologie de Reconstruction",
        description: "Comprendre et exploiter les cycles naturels pour restaurer un environnement vivable.",
        date: "2026-03-01",
        createur_id: 5,
        categorie_id: 7,
        duree: 18,
        difficulte: "Intermédiaire",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Formations", null, {});
  }
};
