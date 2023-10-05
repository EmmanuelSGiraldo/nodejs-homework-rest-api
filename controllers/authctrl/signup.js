const User = require("../../schemas/user");
const { Conflict, BadRequest } = require("http-errors");
const gravatar = require("gravatar");

const signupctrl = async (req, res, next) => {
  const { username, email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email is already in use");
    }

    const avatarURL = gravatar.url(email);

    const newUser = new User({ username, email, subscription, avatarURL });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          username,
          email,
          avatarURL,
        },
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequest("Validation error"));
    }
    next(error);
  }
};

module.exports = signupctrl;
