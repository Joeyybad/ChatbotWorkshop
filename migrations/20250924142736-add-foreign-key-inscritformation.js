"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Inscrit_Formations", {
      fields: ["cours_id"],
      type: "foreign key",
      name: "fk_inscritformation_cours",
      references: {
        table: "Formations",
        field: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Inscrit_Formations", "fk_inscritformation_cours");
  }
};
