"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InscritFormation extends Model {
    static associate(models) {
      InscritFormation.belongsTo(models.Formation, {
        foreignKey: "cours_id",
        as: "formation"
      });
    }
  }

  InscritFormation.init(
    {
      cours_id: { type: DataTypes.INTEGER, allowNull: false },
      utilisateur_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "InscritFormation",
      tableName: "Inscrit_Formations"
    }
  );

  return InscritFormation;
};
