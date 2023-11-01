let mongoose = require("mongoose");

let ItemSchema = new mongoose.Schema({
}, {timestamps: true})
let CartSchema = new mongoose.Schema({
  status: {type: String, required: false},
  idUser: {type: String, required: false},
  items:[ItemSchema],
}, {timestamps: true})

var Cart = mongoose.model("Cart", CartSchema)

module.exports = { Cart }
