"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Formations", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      titre: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      createur_id: { type: Sequelize.INTEGER, allowNull: false },
      categorie_id: { type: Sequelize.INTEGER, allowNull: false },
      duree: { type: Sequelize.INTEGER, allowNull: false }, // <-- ajouté ici
      difficulte: {
        type: Sequelize.ENUM("Débutant", "Intermédiaire", "Expert"),
        allowNull: false
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Formations");
  }
};
