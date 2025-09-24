const { body, validationResult } = require("express-validator");

// Règles de validation
exports.contactValidationRules = [
  body("lastname")
    .trim()
    .notEmpty().withMessage("Le nom est requis")
    .isLength({ min: 2 }).withMessage("Le nom doit contenir au moins 2 caractères"),

  body("name")
    .trim()
    .notEmpty().withMessage("Le prénom est requis")
    .isLength({ min: 2 }).withMessage("Le prénom doit contenir au moins 2 caractères"),

  body("NumeroDIP")
    .notEmpty().withMessage("Le numéro DIP est requis")
    .isInt().withMessage("Le numéro DIP doit être un nombre"),

  body("sujet")
    .trim()
    .notEmpty().withMessage("Le sujet est requis")
    .isLength({ min: 6 }).withMessage("Le sujet doit contenir au moins 6 caractères"),

  body("message")
    .trim()
    .notEmpty().withMessage("Le message est requis")
    .isLength({ min: 15 }).withMessage("Le message doit contenir au moins 15 caractères"),
];

// Middleware de gestion des erreurs
exports.validateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return res.status(400).json({ success: false, error: firstError.msg });
  }
  next();
};