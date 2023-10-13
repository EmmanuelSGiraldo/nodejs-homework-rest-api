const User = require("../../schemas/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const loginctrl = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  // Verifica si el usuario está verificado
  if (!user.verify) {
    return res.status(403).json({
      status: "error",
      code: 403,
      message: "Unverified user",
      data: "Forbidden",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = loginctrl;
