const contactModel = require('../../models/contact.js')

const express = require("express");


const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const count = await contactModel.find().countDocuments();
    console.log({ count });
    const contacts = await contactModel.find();
    res.status(200).json(contacts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});
router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactModel.findById(id); 
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
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ajustamos el valor de "favorite" según lo proporcionado en el cuerpo de la solicitud
    const newContact = new contactModel({
      name,
      email,
      phone,
      favorite: favorite || false // Asignamos el valor de "favorite" o "false" si no se proporciona
    });

    const savedContact = await newContact.save();

    // Excluimos el campo "__v" de la respuesta JSON utilizando "select"
    res.status(201).json(savedContact.toJSON({ select: "-__v" }));
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactModel.findByIdAndDelete(contactId); // Utilizamos findByIdAndDelete para eliminar el contacto
    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});


router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { name, email, phone } = req.body;
    const updatedFields = {};

    if (name) {
      updatedFields.name = name;
    }
    if (email) {
      updatedFields.email = email;
    }
    if (phone) {
      updatedFields.phone = phone;
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
      id,
      updatedFields,
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
});

module.exports = router;
