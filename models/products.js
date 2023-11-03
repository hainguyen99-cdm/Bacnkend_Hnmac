let mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
  name: {type: String, required:false},
  avartar:{ type: String, required: false},
  img: [{ type: String, required: false}],
  option_group:{ type: mongoose.Schema.Types.ObjectId, ref: 'OptionGroup'},
  description: {type: String, required:false},
  status: {type: Boolean, required:false, default: true },
}, {timestamps: true})
var Product = mongoose.model('Product', ProductSchema)
module.exports = { Product }
