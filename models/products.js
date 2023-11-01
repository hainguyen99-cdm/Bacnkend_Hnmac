let mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
  name: {type: String, required:false},
  avartar:{ type: String, required: false},
  img: [{ type: String, required: false}],
  option_group_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'OptionGroup'},
  price: {type: String, required:false},
  amount: {type: Number, required:false},
  description: {type: String, required:false},
}, {timestamps: true})
var Product = mongoose.model('Product', ProductSchema)
module.exports = { Product }
