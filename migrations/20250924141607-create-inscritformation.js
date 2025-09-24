"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Inscrit_Formations", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      cours_id: { type: Sequelize.INTEGER, allowNull: false },
      utilisateur_id: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Inscrit_Formations");
  }
};
