const meCtrl = async (req, res, next) => {
 const {username}= req.user;
 res.json({
  status: "success",
  code:200,
  data:{
    message: `Authorizatiion was succsessful: ${username}`
  }
 });
};
module.exports = meCtrl;