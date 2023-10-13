// Archivo resendVerificationEmailCtrl.js

const User = require("../../schemas/user");
const emailService = require("../../config/emailService");

const resendVerificationEmailCtrl = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Verification email sent" });
    }

    // Si el usuario no está verificado, reenviar el correo de verificación
    const verificationToken = user.verificationToken; // Obtén el token de verificación existente

    await emailService.sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationEmailCtrl;
