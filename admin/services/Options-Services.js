const logger = require('../../helpers/logger')('facebookService')
const { Options } = require('../../models/options')
const { SubCategories } = require('../../models/subcategories')
const { OptionsValue } = require('../../models/optionValue')


const { Product } = require('../../models/products')

let OptionsService = {
    createoption: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const title = req.body.title
                const value = req.body.value
                let arrValueOption = []
                const options = await Options.findOne({ title: title })
                if (options) return reject(new Error("option da ton tai"))
                if (value.length > 0) {
                    for (let i = 0; i < value.length; i++) {
                        let index = i
                        let optionValue = await OptionsValue.findOne({ value: value[index] })
                        if (!optionValue) {
                            console.log("create value options");

                            let resValueOption = await OptionsValue({
                                value: value[index]
                            }).save()
                            arrValueOption.push(resValueOption._id)
                        } else {
                            arrValueOption.push(optionValue._id)
                        }
                    }
                }
                console.log(arrValueOption);
                const response = await Options({
                    title: title,
                    value: arrValueOption
                }).save()

                return resolve(response)
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
                    model: 'OptionsValue', // Tên của model OptionsValue
                    select: 'value' // Chọn trường 'value' để lấy
                  }).exec();
                  const responseData = getListOption.map(options => {
                    return {
                      status: true,
                      _id: options._id,
                      name: options.title,
                      createdAt: options.createdAt,
                      updatedAt: options.updatedAt,
                      value: options.value
                    };
                  });
                  return resolve(responseData);
              
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

module.exports = OptionsService