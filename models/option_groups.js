let mongoose = require("mongoose");

let OptionGroupSchema = new mongoose.Schema({
    options: [
       {
          option_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Options'}, 
          value:{type: mongoose.Schema.Types.ObjectId, ref: 'OptionsValue'}, 
       },
    ],
    group_price: {type: Number, required:false},
    amount: {type: Number, required:false}
 })
 var OptionGroup = mongoose.model('OptionGroup', OptionGroupSchema)
 module.exports = { OptionGroup }