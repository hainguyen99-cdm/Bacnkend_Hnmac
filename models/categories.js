let mongoose = require("mongoose");

 
let CategoriesSchema = new mongoose.Schema({
  name: {type: String, required:false},
  description: {type: Number, required:false},
  subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories' }],
  status:{type: Boolean,default: true}
}, {timestamps: true})

var Categories = mongoose.model('Categories', CategoriesSchema)
module.exports = { Categories }
