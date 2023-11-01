let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  userName: {type: String, required:false},
  passWord: {type: String, required:false},
  refreshToken:{type: String, required:false},
  name: {type: String, required:false},
  active: {type: Boolean, required: false},
  role: {type: String, required: false},
}, {timestamps: true})

var User = mongoose.model("User", UserSchema)
module.exports = { User }
