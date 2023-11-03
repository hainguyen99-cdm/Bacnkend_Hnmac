const logger = require('../../helpers/logger')('facebookService')
const { Options } = require('../../models/options')
const { OptionsValue } = require('../../models/optionValue')
const { OptionGroup } = require('../../models/option_groups')
const { Product } = require('../../models/products')

let GroupOptionsService = {
    creategroupoption: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const options = req.body.options
                let arrOptions=[]

                for(let i=0;i<options.length;i++){
                    let index =i
                   let optionId= options[index].optionId
                   let valueId = options[index].value
                   let option = await Options.findOne({_id:optionId})
              
                   if(option){
                    if (option.value.includes(valueId)) {
                        let options ={
                            optionId,
                            valueId
                        }
                        arrOptions.push(options)
                       
                      } else {
                        return reject(new Error("value option khong dung"))
                      }
                   }else{
                    console.log(option)
                    return reject(new Error("Id option khong dung"))
                   }
                }
                
             if(arrOptions.length>0){
                console.log(arrOptions)

                const response = await OptionGroup({
                    options:{
                        option_id:arrOptions[0].optionId,
                        value:arrOptions[0].valueId
                    }
                }).save()
                return resolve(response)
             }else{
                return resolve(false)
             }   
            } catch (e) {
                console.log(e)
                console.log(logger(e))
                return resolve(false)
            }
        })
    },
    updateoption: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const idOption = req.body.idOption
                const title = req.body.title
                const optionValues = req.body.value
                let arrValueOption = []
                const option = await Options.findOne({ _id: idOption })
                if (!option) {
                    return reject(new Error("Id option khong dung"))
                }
                if (optionValues.length > 0) {
                    for (let i = 0; i < optionValues.length; i++) {
                        let index = i;
                        let optionValue = await OptionsValue.findOne({ value: optionValues[index] })
                        if (!optionValue) {
                            let resOptionValue = await OptionsValue({
                                value: optionValues[index]
                            }).save()
                            arrValueOption.push(resOptionValue._id)
                        } else {
                            arrValueOption.push(optionValue._id)
                        }
                    }
                }
                let update = {}
                if (title) update.title = title
                update.$set = { value: arrValueOption }
                const response = await Options.findOneAndUpdate({ _id: idOption }, update, { new: true })
                resolve(response)
            } catch (e) {
                console.log(e)
                console.log(logger(e))
            }
        })
    },
    deloption: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const idOption = req.body.idOption;
                if (!idOption) {
                    throw new Error("Id option không hợp lệ");
                }
                const option = await Options.findOneAndDelete({ _id: idOption });
                if (!option) {
                    throw new Error("khong tim thay option");
                }
                resolve(true);
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    },
    getListoption() {
        return new Promise(async function (resolve, reject) {
            try {
                const getListOption = await Options.find({}, { __v: 0 }, { sort: { createdAt: -1 } }).populate({
                    path: 'value',
                    // model: 'OptionsValue', // Tên của model OptionsValue
                    // select: 'value' // Chọn trường 'value' để lấy
                  }).exec();
                return resolve(getListOption)
            } catch (err) {
                console.log(err)
                return reject(err)
            }
        })
    },

}
async function addProductToSubcategory(subCategoryId, productId) {
    return new Promise(async function (resolve, reject) {
        try {
            for (let i = 0; i < subCategoryId.length; i++) {
                await SubCategories.updateMany(
                    { _id: subCategoryId[i] },
                    { $push: { products: productId } }
                );
            }
            return resolve(true)
        } catch (err) {
            console.log(err)
            return reject(err)
        }
    })
}
function test(params, params1) {
    console.log('params')
    console.log(params.a)
    console.log(params.b)
}

function sleep(ms) {
    return new Promise((resole) => {
        setTimeout(resole, ms)
    })
}

module.exports = GroupOptionsService