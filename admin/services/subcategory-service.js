const { SubCategories } = require('../../models/subcategories')
const {Categories} = require('../../models/categories')
const {Product} = require('../../models/products')

let subcategoryService = {
  createSubCategory: async function(req) {
   return new Promise(async function(resolve, reject) {
      try {
        const name = req.body.name
        const product=req.body.product
        const category= req.body.category
        const subcategory = await SubCategories.findOne({name: name})
        console.log(category)

        for(let i=0;i<category.length;i++){

          let categoryId= await Categories.findOne({_id:category[i]})
     

          if(!categoryId) return reject(new Error(" category khong ton tai"))
        }
        for(let i=0;i<product.length;i++){
          let productId= await Product.findOne({_id:product[i]})
          if(!productId) return reject(new Error(" product khong ton tai "))
        }
        if (subcategory) return reject(new Error("Ten sub category da ton tai"))
        const response = await SubCategories({
          name: name,
          product:product
        }).save()
        console.log(response._id)
        for(let i=0;i<category.length;i++){
          await Categories.updateMany(
          { _id: category[i] },
          { $push: { subcategory: response._id} }
        );
    }      
        return resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
        return resolve(false)
      }
    })
  },
  updateSubCategory: async function(req) {
    return new Promise(async function(resolve, reject) {
      try {
        const idSubCategory = req.body.idSubCategory
        const name = req.body.name
        const product = req.body.product
        const SubCategory= await SubCategories.findOne({_id: idSubCategory})
        if (!SubCategory) {
          return reject(new Error("Id subcategory khong dung"))
        }
        let update = {}
        if (name) update.name = name
        if(product) update.product=product
        const response = await SubCategories.findOneAndUpdate({_id: idSubCategory}, update,{ new: true})
        resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
      }
    })
  },
  delSubCategory: async function(req){
    return new Promise(async function (resolve, reject) {
        try {
          const idSubCategory = req.body.idSubCategory;
          if (!idSubCategory) {
            throw new Error("Id subcategory không hợp lệ");
          }
          const subCategory = await SubCategories.findOneAndDelete({ _id: idSubCategory });
          if (!subCategory) {
            throw new Error("Không tìm thấy danh mục");
          }
          resolve(subCategory);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
  },
  getListSubCategory() {
    return new Promise(async function(resolve, reject) {
      try {
        const listCategory = await SubCategories.find({}, {__v: 0}).sort({createdAt: -1}).populate('product').exec();
        const responseData = listCategory.map(subCategory => {
          return {
            status: true,
            _id: subCategory._id,
            name: subCategory.name,
            createdAt: subCategory.createdAt,
            updatedAt: subCategory.updatedAt,
            products: subCategory.product
 
          };
        });
        return resolve(responseData);
      } catch (err) {
        console.log(err);
        return reject(err);
      }
    });
    
  },
  addSubCategoryToCategory: async function(req) {
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
function push(){
  
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

module.exports = subcategoryService