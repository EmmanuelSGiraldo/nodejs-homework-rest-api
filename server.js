const express = require("express");
const cors = require("cors");
const association = require("./db/association");
require("dotenv").config();
const routerApi = require("./api");

const app = express();

app.use(express.json());
app.use(cors());

require("./config/config-passport");

app.use("/api", routerApi);

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
