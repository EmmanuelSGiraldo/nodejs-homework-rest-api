const ContactModel = require("../../schemas/contacts");
require("dotenv").config();

const changeFavoriteId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    const contact = await ContactModel.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

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

module.exports = changeFavoriteId;
