const invalidatedTokens = new Set();

const logOutctrl = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    invalidatedTokens.add(token);
    console.log(Array.from(invalidatedTokens));
    res.status(204).json({
      status: "success",
      code: 200,
      message: "Successfully logout",
      data: "Success",
    });
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid token",
    });
  }
};

module.exports = logOutctrl;
