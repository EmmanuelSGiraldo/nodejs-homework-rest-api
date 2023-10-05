const ContactModel = require("../../schemas/contacts");
require("dotenv").config();

const contactForId = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await ContactModel.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = contactForId;
