const express = require("express");
const router = express.Router();

// Importa el modelo de contacto
const ContactModel = require("../../models/contact.js");

// Ruta para obtener todos los contactos
router.get("/", async (req, res, next) => {
  try {
    // Obtiene el número total de contactos
    const count = await ContactModel.find().countDocuments();
    console.log({ count });

    // Obtiene todos los contactos
    const contacts = await ContactModel.find();
    res.status(200).json(contacts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

// Ruta para obtener un contacto por su ID
router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    // Busca un contacto por su ID
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
});

// Ruta para agregar un nuevo contacto
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ajusta el valor de "favorite" según lo proporcionado en el cuerpo de la solicitud
    const newContact = new ContactModel({
      name,
      email,
      phone,
      favorite: favorite || false, // Asigna el valor de "favorite" o "false" si no se proporciona
    });

    const savedContact = await newContact.save();

    // Excluye el campo "__v" de la respuesta JSON utilizando "select"
    res.status(201).json(savedContact.toJSON({ select: "-__v" }));
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

// Ruta para eliminar un contacto por su ID
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // Elimina un contacto por su ID
    const deletedContact = await ContactModel.findByIdAndDelete(contactId);

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
// Ruta para actualizar un contacto por su ID
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log("contactId:", contactId); // Agrega este log
    console.log("req.body:", req.body); // Agrega este log

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
});
// Ruta para actualizar el estado favorito de un contacto por su ID
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    // Verifica si el campo "favorite" está presente en el cuerpo de la solicitud
    if (favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }   


    // Busca el contacto por su ID
    const contact = await ContactModel.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    // Verifica si el contacto no se encontró en la base de datos
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    // Devuelve el contacto actualizado
    res.status(200).json(contact);
  } catch (error) {
    // Manejo de otros errores
    if (!error.statusCode) {
      error.statusCode = 500; // Cambia el estado a 500 en caso de otros errores
    }
    next(error);
  }
});

module.exports = router;
