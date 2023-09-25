const ContactModel = require("../../schemas/contacts");
require("dotenv").config();

const updateForId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = updateForId;
