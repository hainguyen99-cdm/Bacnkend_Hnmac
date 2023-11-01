let mongoose = require("mongoose");

let OptionGroupSchema = new mongoose.Schema({
    options: [
       {
          option_id: {type: mongoose.Schema.Types.ObjectId, ref: 'OptionGroup'}, 
          value: String
       },
    ],
    group_price: Number
 })
 var OptionGroup = mongoose.model("OptionGroup", OptionGroupSchema)
 module.exports = { OptionGroup }