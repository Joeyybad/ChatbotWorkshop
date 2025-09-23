'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ListeFamille extends Model {
    static associate(models) {
      ListeFamille.belongsToMany(models.ChatbotData, {
        through: 'famille_article',
        foreignKey: 'id_famille',
        otherKey: 'id_article'
      });
    }
  }

  ListeFamille.init({
    famille: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ListeFamille',
    tableName: 'liste_famille',
    timestamps: false
  });

  return ListeFamille;
};
