const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  isAvatarset: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "",
  },
});
module.exports=mongoose.model("Users",userSchema);