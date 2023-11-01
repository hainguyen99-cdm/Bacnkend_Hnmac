let mongoose = require("mongoose");

let OptionstSchema = new mongoose.Schema({
  name: {type: String, required:false},
  properties:{type: String, required:false}
}, {timestamps: true})

var Options = mongoose.model('Options', OptionstSchema)
module.exports = { Options }
