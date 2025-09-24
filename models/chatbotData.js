'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatbotData extends Model {
    static associate(models) {
      ChatbotData.belongsToMany(models.ListeFamille, {
        through: 'famille_article',
        foreignKey: 'id_article',
        otherKey: 'id_famille'
      });
    }
  }


  ChatbotData.init({
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    texte: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ChatbotData',
    tableName: 'chatbot_data',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return ChatbotData;
};
