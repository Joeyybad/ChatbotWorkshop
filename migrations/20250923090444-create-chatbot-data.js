'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chatbot_data', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      texte: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chatbot_data');
  }
};
