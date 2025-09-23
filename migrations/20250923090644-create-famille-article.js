'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('famille_article', {
      id_article: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chatbot_data',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      id_famille: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'liste_famille',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('famille_article');
  }
};
