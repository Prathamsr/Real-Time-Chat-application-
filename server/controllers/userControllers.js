const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { userName, mail, password } = req.body;
    const usernameCheck = await Users.findOne({ userName });
    if (usernameCheck) {
      return res.json({ msg: "Username already present", status: false });
    }
    const emailCheck = await Users.findOne({ mail });
    if (emailCheck) {
      return res.json({ msg: "Email already present", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username: userName,
      email: mail,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ user, status: true });
  } catch (ex) {
    next(ex);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await Users.findOne({ username:userName });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return res.json({ user, status: true });
      } else {
        return res.json({
          msg: "Incorrect Username or password",
          status: false,
        });
      }
    } else {
      return res.json({ msg: "Incorrect Username or password", status: false });
    }
  } catch (ex) {
    next(ex);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const avatarImage = req.body.image;
    const user = await Users.findByIdAndUpdate(userId, {
      isAvatarset: true,
      avatar:avatarImage,
    });
    
    return res.json({ user, status: true });
  } catch (error) {
    return res.json({ status: false });
  }
};
module.exports.allUsers = async (req, res, next) => {
  const userId=req.body.id;
  console.log(userId);
  try {
    const users = await Users.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatar",
      "_id",
    ]);
    return res.json({ users, status: true });
  } catch (error) {
    return res.json({ status: true });
  }
};
