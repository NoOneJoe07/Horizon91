const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "contact@etoileboreale.ca",
    pass: process.env.ZOHO_PASS
  },
  debug: true,
  logger: true
});
transporter.verify((err, ok) => {
  if (err) console.log('ERREUR:', err.message);
  else console.log('SUCCÈS — SMTP connecté!');
});
