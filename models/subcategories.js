let mongoose = require("mongoose");

 
let SubCategoriesSchema = new mongoose.Schema({
  name: {type: String, required:false},
  description: {type: Number, required:false},
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status:{type: Boolean,default: true}
}, {timestamps: true})

var SubCategories = mongoose.model('SubCategories', SubCategoriesSchema)
module.exports = { SubCategories }
