let mongoose = require("mongoose");
const role = require("./enum/role");

let UserSchema = new mongoose.Schema({
  userName: {type: String, required:false},
  passWord: {type: String, required:false},
  refreshToken:{type: String, required:false},
  name: {type: String, required:false},
  active: {type: Boolean, required: false},
  role: {type: String, required: false,default:role.USER},
}, {timestamps: true})

var User = mongoose.model("User", UserSchema)
module.exports = { User }
