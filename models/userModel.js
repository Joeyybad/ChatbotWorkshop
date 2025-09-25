/**
 * Modèle User pour Sequelize
 * ---------------------------
 * Ce fichier définit la structure de la table `User` dans la base de données
 * ainsi que les méthodes et hooks associés. 
 * Il permet de formaliser les colonnes, les types de données et les contraintes,
 * et gère le hashage automatique du mot de passe et la génération d'un numéro DIP unique.
 */

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Méthode pour définir les associations éventuelles avec d'autres modèles.
         * Exemple : User.hasMany(models.Post)
         */
        static associate(models) {
            // Associations éventuelles
        }

        /**
         * Méthode d'instance pour vérifier un mot de passe.
         * @param {string} password - Mot de passe à vérifier
         * @returns {Promise<boolean>} true si le mot de passe correspond
         */
        async validatePassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }

    // Définition des colonnes et options du modèle
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // auto-incrément pour ID unique
            },
            numeroDIP: {
                type: DataTypes.STRING(8),
                allowNull: false,
                unique: true, // chaque DIP doit être unique
                comment: "Numéro DIP unique à 8 chiffres"
            },
            firstname: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false, // par défaut, l'utilisateur n'est pas admin
            },
            isModerator: {
                type: DataTypes.BOOLEAN,
                defaultValue: false, // par défaut, l'utilisateur n'est pas modérateur
            },
            birthdate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "Mot de passe hashé"
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                /**
                 * Hook exécuté avant la création d'un utilisateur
                 * - Génère un numéro DIP unique si non fourni
                 * - Hash le mot de passe
                 */
                beforeCreate: async (user) => {
                    // Génération du DIP unique
                    if (!user.numeroDIP) {
                        let unique = false;
                        while (!unique) {
                            const randomDIP = Math.floor(10000000 + Math.random() * 90000000).toString();
                            const existingUser = await User.findOne({ where: { numeroDIP: randomDIP } });
                            if (!existingUser) {
                                user.numeroDIP = randomDIP;
                                unique = true;
                            }
                        }
                    }

                    // Hashage du mot de passe si présent
                    if (user.password && user.password !== "") {
                        const hashedPassword = await bcrypt.hash(user.password, 4);
                        user.password = hashedPassword;
                    }
                },

                /**
                 * Hook exécuté avant la mise à jour d'un utilisateur
                 * - Re-hash le mot de passe si modifié
                 */
                beforeUpdate: async (user) => {
                    if (user.changed("password") && user.password !== "") {
                        const hashedPassword = await bcrypt.hash(user.password, 4);
                        user.password = hashedPassword;
                    }
                },
            },
        }
    );

    return User;
};