const { v4: uuidv4 } = require("uuid");

exports.generateVerificationToken = () => {
  return uuidv4();
};
