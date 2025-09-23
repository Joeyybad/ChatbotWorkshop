'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajoute l'index FULLTEXT
    await queryInterface.addIndex('chatbot_data', {
      name: 'ft_texte',
      fields: ['texte'],
      type: 'FULLTEXT'
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprime l'index si besoin de rollback
    await queryInterface.removeIndex('chatbot_data', 'ft_texte');
  }
};
