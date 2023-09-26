const ContactModel = require("../../schemas/contacts");
require("dotenv").config();

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const owner = req.user.id;

    const newContact = new ContactModel({
      name,
      email,
      phone,
      favorite: favorite || false,
      owner: owner,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact.toJSON({ select: "-__v" }));
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = addContact;
