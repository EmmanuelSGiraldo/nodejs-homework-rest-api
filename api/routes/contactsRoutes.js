const express = require("express");
const router = express.Router();
const validToken = require("../../midddleware/validToken");
const auth = require("../../midddleware/auth");
const contactForId = require("../../controllers/contactsctrl/contactForId");
const updateForId = require("../../controllers/contactsctrl/updateForId");
const addContact = require("../../controllers/contactsctrl/addContact");
const changeFavoriteId = require("../../controllers/contactsctrl/changeFavoriteId");
const deleteContact = require("../../controllers/contactsctrl/deleteContact");
const userAllContacts = require("../../controllers/contactsctrl/userAllcontacts");



// Ruta para obtener todos los contactos de usuario
router.get("/contacts", validToken, auth, userAllContacts);

router.get("/contacts/:contactId", validToken, auth, contactForId);

// Ruta para actualizar un contacto por su ID
router.put("/contacts/:contactId", validToken, auth, updateForId);

// Ruta para agregar un nuevo contacto
router.post("/contacts", validToken, auth, addContact);

// Ruta para cambiar favorito por id
router.delete("/contacts/:contactId", validToken, auth, deleteContact);

// Ruta para actualizar el estado favorito de un contacto por su ID
router.patch(
  "/contacts/:contactId/favorite",
  validToken,
  auth,
  changeFavoriteId
);

// Ruta para Eliminar contacto por idgit status
router.delete("/contacts/:contactId", validToken, auth, deleteContact);



module.exports = router;
