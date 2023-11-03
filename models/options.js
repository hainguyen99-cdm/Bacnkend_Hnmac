let mongoose = require("mongoose");

let OptionstSchema = new mongoose.Schema({
  title:{type: String, required:false},
  value:[{type: mongoose.Schema.Types.ObjectId, ref: 'OptionsValue'}], 
}, {timestamps: true})

var Options = mongoose.model('Options', OptionstSchema)
module.exports = { Options }
