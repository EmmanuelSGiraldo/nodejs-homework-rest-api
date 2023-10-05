const express = require("express");
const router = express.Router();
const validToken = require("../../midddleware/validToken")
const auth = require("../../midddleware/auth");
const signupctrl = require("../../controllers/authctrl/signup");
const loginctrl = require("../../controllers/authctrl/login");
const logOutctrl = require("../../controllers/authctrl/logout")




// RUTAS DEL AUTH

// Ruta para registro de usuarios
router.post("/users/signup", signupctrl);

// Ruta para inicio de sesión
router.post("/users/login", loginctrl);

// Ruta para cerrar sesión y agregar el token a invalidatedTokens
router.post("/users/logout", validToken, auth, logOutctrl);

module.exports = router;