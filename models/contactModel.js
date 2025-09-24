'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // plus tard on pourra lier à User 
      // Contact.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Contact.init({
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroDIP: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    sujet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true, // ajoute createdAt et updatedAt
  });

  return Contact;
};