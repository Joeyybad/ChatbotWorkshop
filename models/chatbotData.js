'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatbotData extends Model {
    static associate(models) {
      // Associations si besoin
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
    timestamps: false
  });

  return ChatbotData;
};
