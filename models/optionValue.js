let mongoose = require("mongoose");

let OptionsValuetSchema = new mongoose.Schema({
  value:{type: String, required:false}
}, {timestamps: true})
var OptionsValue = mongoose.model('OptionsValue', OptionsValuetSchema)
module.exports = { OptionsValue }
