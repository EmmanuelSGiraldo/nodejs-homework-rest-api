const express = require("express");
const router = express.Router();
const validToken = require("../../midddleware/validToken");
const auth = require("../../midddleware/auth");
const meCtrl = require("../../controllers/userctrl/me");
const upload = require("../../midddleware/upload")
const updateAvatar = require("../../controllers/userctrl/updateAvartar")

// Ruta para obtener información (contactos) del usuario autenticado
router.get("/users/current", validToken, auth, meCtrl);

// Ruta para subir un archivo a la carpeta temporal
router.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.status(200).json({ message: "Archivo subido exitosamente a la carpeta temporal" });
});

// Ruta para modificar avatar & jimp
router.patch("/users/avatar", validToken,auth,upload.single("avatar"),updateAvatar);

module.exports = router;