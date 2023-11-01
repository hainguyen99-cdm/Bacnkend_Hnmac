const logger = require('../../helpers/logger')('facebookService')
const { Categories } = require('../../models/categories')
const { Product } = require('../../models/products')
let mongoose = require("mongoose");

let ProductService = {
      createproduct: async function(req) {
   return new Promise(async function(resolve, reject) {
      try {
        const name = req.body.name
        const subcategory = req.body.subcategory
        const price = req.body.price
        const amount = req.body.amount
        const description = req.body.description
        
        const product = await Product.findOne({name: name})
        if (product) return reject(new Error("Ten san pham da ton tai"))

        const response = await Product({
          name: name,
          subcategory:subcategory,
          price: price,
          amount:amount,
          description:description
        }).save()
 
       
  

        return resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
        return resolve(false)
      }
    })
  },
  updateproduct: async function(req) {
    return new Promise(async function(resolve, reject) {
      try {
        const idProduct = req.body.productId
        const subcategory=req.body.subcategory
        const name = req.body.name
        const price = req.body.price
        const amount = req.body.amount
        const description = req.body.description
        let subategoryIds = [];
        if (subcategory && Array.isArray(subcategory)) {
          subategoryIds = subcategory.map(subCatId => {
            if (/^[0-9a-fA-F]{24}$/.test(subCatId)) {
              return mongoose.Types.ObjectId(subCatId);
            } else {
              console.error(`Invalid ObjectId: ${subCatId}`);
              return null;
            }
          }).filter(Boolean);
        } else {
          console.error('category is not a valid array');
        }
        const product= await Product.findOne({_id: idProduct})
        if (!product) {
          return reject(new Error("Id idProduct khong dung"))
        }
        let update = {}
        if (name) update.name = name
        if (price) update.price = price   
        if (subategoryIds.length > 0)  update.$set = { subcategory: subategoryIds };
        if (amount) update.amount = amount 
        if (description) update.description = description 
        const response = await Product.findOneAndUpdate({_id: idProduct},  update ,{ new: true})
        resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
      }
    })
  },
  delproduct: async function(req){
    return new Promise(async function (resolve, reject) {
        try {
          const productId = req.body.productId;
          if (!productId) {
            throw new Error("Id san pham không hợp lệ");
          }
        
          const product = await Product.findOneAndDelete({ _id: productId });
          console.log(product.category)
          if (!product) {
            throw new Error("khong tim thay san pham");
          }
          resolve(true);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
  },
  getListproduct() {
    return new Promise(async function(resolve, reject) {
      try {  
        const getListProduct = await Product.find({}, {__v: 0 }, {sort: {createdAt: -1}})
        return resolve(getListProduct)
      } catch (err) {
        console.log(err)
        return reject(err) 
      }
    })
  },
  // getListproductByIdCategory: async function(req) {
  //   return new Promise(async function(resolve, reject) {
  //     try {  
  //       const catId = req.body.catId
  //       const filter = {'idCategory': catId}
  //       const listProduct = await Product.find(filter, {__v: 0 }, {sort: {createdAt: -1}})
  //       return resolve(listProduct)
  //     } catch (err) {
  //       console.log(err)
  //       return reject(err) 
  //     }
  //   })
  // },
  addProductToCategory: async function(req) {
    return new Promise(async function(resolve, reject) {
      try {  
        const categoryId = req.body.categoryId
        const productId = req.body.productId
        console.log(categoryId.length)
      for(let i=0;i<categoryId.length;i++){
            await Categories.updateMany(
            { _id: categoryId[i] },
            { $push: { products: productId} }
          );
      }      
        return resolve(true)
      } catch (err) {
        console.log(err)
        return reject(err) 
      }
    })
  }
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