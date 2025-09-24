"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Formation extends Model {
    static associate(models) {
      Formation.belongsTo(models.ListeFamille, {
        foreignKey: "categorie_id",
        as: "categorie"
      });

      Formation.hasMany(models.InscritFormation, {
        foreignKey: "cours_id",
        as: "inscriptions"
      });
    }
  }

  Formation.init(
    {
      titre: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      createur_id: { type: DataTypes.INTEGER, allowNull: false },
      categorie_id: { type: DataTypes.INTEGER, allowNull: false },
      duree: { type: DataTypes.INTEGER, allowNull: false }, // durée en heures (ou minutes si tu préfères)
      difficulte: {
        type: DataTypes.ENUM("Débutant", "Intermédiaire", "Expert"),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Formation",
      tableName: "Formations"
    }
  );

  return Formation;
};
