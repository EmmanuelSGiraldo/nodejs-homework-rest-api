
const nodemailer = require("nodemailer");
const { GMAIL_USER, GMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

 exports.sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: GMAIL_USER,
    to: email,
    subject: "Verifica tu correo electrónico",
    text: `Haz clic en este enlace para verificar tu correo electrónico: 
           http://localhost:3000/api/users/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado.");
  } catch (error) { 
    console.error("Error al enviar el correo de verificación:", error);
  }
};

