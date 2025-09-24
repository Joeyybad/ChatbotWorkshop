// middleware/contactLimiter.js
// const rateLimit = require("express-rate-limit");

// const contactLimiter = rateLimit({
//   windowMs: 2 * 60 * 1000, // 2 minutes
//   max: 10,                  // 10 tentatives par IP
//   message: "Trop de tentatives, réessayez plus tard.",
// });

// module.exports = contactLimiter;

// middleware/contactLimiter.js
const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 secondes
  max: 10,              // 10 tentatives par IP
  message: "Trop de tentatives, réessayez plus tard.",
});

module.exports = contactLimiter;