let mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  status: {type: String, required: false},
  idOrder:{type:Number,require:true},
  idUser: {type: String, required: false},
  idTransaction: {type: String, required: false},
  totalPrie:{type:Number,require:true}
}, {timestamps: true})

var Order = mongoose.model("Order", OrderSchema)

module.exports = { Order }
