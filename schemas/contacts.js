const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{10}$/;

const contactSchema = new Schema(
  {
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
      match: [emailRegex, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      match: [phoneRegex, "Invalid phone number format"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("contact", contactSchema);
