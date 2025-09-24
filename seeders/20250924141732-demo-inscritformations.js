"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Inscrit_Formations", [
      {
        cours_id: 1,
        utilisateur_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        cours_id: 1,
        utilisateur_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        cours_id: 1,
        utilisateur_id: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cours_id: 2,
        utilisateur_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Inscrit_Formations", null, {});
  }
};
