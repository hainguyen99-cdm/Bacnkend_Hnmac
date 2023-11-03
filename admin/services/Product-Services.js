const logger = require('../../helpers/logger')('facebookService')
const { Categories } = require('../../models/categories')
const { SubCategories } = require('../../models/subcategories')
const { Options } = require('../../models/options')
const { OptionsValue } = require('../../models/optionValue')
const { OptionGroup } = require('../../models/option_groups')

const { Product } = require('../../models/products')
let mongoose = require("mongoose");

let ProductService = {
  createproduct: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const name = req.body.name
        const subcategoryid = req.body.subcategoryid
        const avartar = req.body.avartar
        const img = req.body.img
        const description = req.body.description
        const groupOption = req.body.groupOption
        console.log(groupOption)
        const product = await Product.findOne({ name: name })
        if (product) return reject(new Error("Ten san pham da ton tai"))
        for (let i = 0; i < subcategoryid.length; i++) {
          let subcategory = await SubCategories.findOne({ _id: subcategoryid[i] })
          if (!subcategory) return reject(new Error("subcategory khong ton tai"))
        }
        const response = await Product({
          name: name,
          avartar: avartar,
          img: img,
          description: description,
          option_group: groupOption,
        }).save()
        await addProductToSubcategory(subcategoryid, response._id)
        return resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
        return resolve(false)
      }
    })
  },
  updateproduct: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const idProduct = req.body.productId
        const avartar = req.body.avartar
        const img = req.body.img
        const name = req.body.name
        const description = req.body.description
        const groupOption = req.body.groupOption
        const product = await Product.findOne({ _id: idProduct })
        if (!product) {
          return reject(new Error("Id idProduct khong dung"))
        }
        let update = {}
        if (name) update.name = name
        if (avartar) update.avartar = avartar
        if (img.length > 0) update.$set = { img: img }
        if (groupOption.length > 0) update.$set = { option_group: groupOption };
        if (amount) update.amount = amount
        if (description) update.description = description
        const response = await Product.findOneAndUpdate({ _id: idProduct }, update, { new: true })
        resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
      }
    })
  },
  delproduct: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const productId = req.body.productId;
        if (!productId) {
          throw new Error("Id san pham không hợp lệ");
        }
        const product = await Product.findOneAndDelete({ _id: productId });
        if (!product) {
          throw new Error("khong tim thay san pham");
        }
        await SubCategories.updateMany(
          { product: productId },
          { $pull: { product: productId } },)
        resolve(true);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
  getListproduct() {
    return new Promise(async function (resolve, reject) {
      try {
        const getListProduct = await Product.find({}, { __v: 0 }, { sort: { createdAt: -1 } })
        const formattedData = await Promise.all(getListProduct.map(async (product) => {
          const optionGroupData = await OptionGroup.findById(product.option_group); // Giả sử option_group có một trường _id
          if (optionGroupData.options != null) {
            const Arroptions = optionGroupData.options
             options = await Promise.all(Arroptions.map(async (option) => {
              const optiondata = await Options.findOne({ _id: option.option_id })
              const valueOption = await OptionsValue.findOne({ _id: option.value })
              return {
                title: optiondata.title,
                value: valueOption.value
              };
            }))
          }
          return {
            _id: product._id,
            name: product.name,
            avartar: product.avartar,
            img: product.img,
            option_group: {
              _id: optionGroupData._id,
              options: options,
              amount: optionGroupData.amount,
              price: optionGroupData.price
            }, // Gán giá trị từ bảng option_group vào trường option_group
            description: product.description,
            status: product.status
          };
        }));
        return resolve(formattedData)

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

module.exports = ProductService