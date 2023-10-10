const User = require("../../schemas/user");
const { Conflict, BadRequest } = require("http-errors");
const gravatar = require("gravatar");
const emailService = require("../../config/emailService");
const tokenService = require("../../config/tokenService");

const signupctrl = async (req, res, next) => {
  const { username, email, password, subscription } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email is already in use");
    }

    const avatarURL = gravatar.url(email);

    const verificationToken = tokenService.generateVerificationToken();

    const newUser = new User({
      username,
      email,
      subscription,
      avatarURL,
      verificationToken,
    });

    newUser.setPassword(password);
    await newUser.save();

    await emailService.sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          username,
          email,
          avatarURL,
          verificationToken,
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
