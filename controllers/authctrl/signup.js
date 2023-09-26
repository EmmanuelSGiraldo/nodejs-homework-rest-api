const User = require("../../schemas/user");
require("dotenv").config();

const signupctrl = async (req, res, next) => {
  const { username, email, password, subscription } = req.body; 
  
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Error Conflict",
      });
    }

    const newUser = new User({ username, email, subscription }); 
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signupctrl;
