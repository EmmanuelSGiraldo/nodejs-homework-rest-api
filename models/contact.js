const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Expresiones regulares para validar correo electrónico y teléfono
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{10}$/;

const contactSchema = new Schema({
  favorite: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
    match: [emailRegex, "Invalid email format"], // Validación de correo electrónico
  },
  phone: {
    type: String,
    required: true,
    match: [phoneRegex, "Invalid phone number format"], // Validación de teléfono
  },
}, { versionKey: false });

module.exports = mongoose.model("contacts", contactSchema);
