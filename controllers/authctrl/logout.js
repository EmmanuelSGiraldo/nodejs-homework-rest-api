const passport = require("passport");
// const auth = require("./auth"); // Importa el middleware 'auth'
const validToken = require("../../midddleware/validToken"); // Importa el middleware 'validToken'
const invalidatedTokens = new Set();
const logOutctrl = async (req, res, next) => {
  // Utiliza el middleware 'auth' para asegurarte de que el usuario esté autenticado
  
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }
    req.user = user;


    validToken(req, res, () => {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        invalidatedTokens.add(token);
        console.log(Array.from(invalidatedTokens));
        res.status(204).json({
          status: "success",
          code: 204,
          message: "Successfully logged out",
          data: "Success",
        });
      } else {
        res.status(400).json({
          status: "error",
          code: 400,
          message: "Invalid token",
        });
      }
    });
  })(req, res, next);
};

module.exports = logOutctrl;
