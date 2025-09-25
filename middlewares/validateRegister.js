// middlewares/validateUser.js
const { body, validationResult } = require("express-validator");

// Règles de validation pour l'inscription utilisateur
exports.userValidationRules = [
  body("firstname")
    .trim()
    .notEmpty().withMessage("Le prénom est requis")
    .isLength({ min: 2 }).withMessage("Le prénom doit contenir au moins 2 caractères"),

  body("lastname")
    .trim()
    .notEmpty().withMessage("Le nom est requis")
    .isLength({ min: 2 }).withMessage("Le nom doit contenir au moins 2 caractères"),

  body("birthdate")
    .notEmpty().withMessage("La date de naissance est requise")
    .isDate().withMessage("La date de naissance doit être une date valide")
    .custom((value) => {
      const birthdate = new Date(value);
      const now = new Date();
      if (birthdate > now) {
        throw new Error("La date de naissance ne peut pas être dans le futur");
      }
      return true;
    }),
  body("city")
    .trim()
    .notEmpty().withMessage("La ville est requise")
    .isLength({ min: 2 }).withMessage("La ville doit contenir au moins 2 caractères"),

  body("password")
    .notEmpty().withMessage("Le mot de passe est requis")
    .isLength({ min: 4 }).withMessage("Le mot de passe doit contenir au moins 4 caractères"),
  ,
];

// Middleware de gestion des erreurs
exports.validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json({ success: false, message: firstError.msg });
  }
  next();
};
