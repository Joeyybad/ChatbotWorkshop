'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('liste_famille', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      famille: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('liste_famille');
  }
};
