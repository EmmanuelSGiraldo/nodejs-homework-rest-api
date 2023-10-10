const User = require("../../schemas/user");
const { NotFound } = require("http-errors");

const emailVerify = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NotFound("User not found");
    }

    await User.updateOne(
      { verificationToken },
      {verify: true,  verificationToken: null}
    );

    // user.verify = true;
    // user.verificationToken = null; 
    // await user.save();

    res.status(200).json({
      status: "success",
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = emailVerify;