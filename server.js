const express = require("express");
const cors = require("cors");
const association = require("./db/association");
require("dotenv").config();

const authRouter = require("./api/routes/authRoutes");
const contactsRouter = require("./api/routes/contactsRoutes");
const userRouter = require("./api/routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
require("./config/config-passport");

app.use(express.static("public"));

app.use("/api", authRouter);
app.use("/api", contactsRouter);
app.use("/api", userRouter);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: ` Use api on routes:
    /api/signup - signup user { username, email, password}
    /api/login -login {email,password}
    /api/list - get message if user is authenticated`,
    data: "No found",
  });
});

app.use((err, _, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

association
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Database connection successful.
         Server running. Use our API on port : ${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(`Server not running. 
Eror message: ${error.message}`);
    process.exit(1);
  });

module.exports = app;
