const User = require("../../schemas/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const serverBaseUrl = "http://localhost:3000";

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, imageName);

    // Procesar y redimensionar el avatar utilizando jimp
    const avatar = await jimp.read(tempUpload);
    avatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    // Verificar si el archivo temporal existe antes de eliminarlo
    const tempUploadExists = await fs
      .access(tempUpload, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (tempUploadExists) {
      await fs.unlink(tempUpload);
    }

    // Construir la URL completa al avatar
    const fullAvatarURL = `${serverBaseUrl}/${avatarURL}`;

    res.json({ avatarURL: fullAvatarURL }); // Enviar la URL completa en la respuesta JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateAvatar;
