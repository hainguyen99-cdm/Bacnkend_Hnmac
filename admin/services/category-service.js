const { Categories } = require('../../models/categories')
const { SubCategories } = require('../../models/subcategories')
const { Product } = require('../../models/products')




let categoryService = {
  createCategory: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const name = req.body.name
        const subcategories = req.body.subcategory;
        const product = req.body.product
        const category = await Categories.findOne({ name: name })
        if (category) return reject(new Error("Ten category da ton tai"))
        if (subcategories != null) {
          for (let i = 0; i < product.length; i++) {
            const subcategoriesId = await SubCategories.findOne({ _id: subcategories[i] })
            if (!subcategoriesId) return reject(new Error(" subcategory khong ton tai"))
          }
        }
        const response = await Categories({
          name: name,
          subcategory: subcategories,
        }).save()
        return resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
        return resolve(false)
      }
    })
  },
  updateCategory: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const idCategory = req.body.idCategory
        const name = req.body.name
        const subcategories = req.body.subcategory
       const category= await Categories.findOne({ _id: idCategory })
        if (!idCategory) {
          return reject(new Error("Id category khong dung"))
        }
        if(!category) {
          return reject(new Error("Id category khong dung"))
        }
        if (subcategories != null) {
          for (let i = 0; i < subcategories.length; i++) {
            const subcategoriesId = await SubCategories.findOne({ _id: subcategories[i] })
            if (!subcategoriesId) return reject(new Error(" subcategory khong ton tai"))
          }
          
        }
        let update = {}
        if (name) update.name = name
        if(subcategories) update.subcategory =subcategories
        const response = await Categories.findOneAndUpdate({ _id: idCategory }, update, { new: true })
        resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
      }
    })
  },
  delCategory: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const idCategory = req.body.idCategory;
        if (!idCategory) {
          throw new Error("Id category không hợp lệ");
        }
        const category = await Categories.findOneAndDelete({ _id: idCategory });
        if (!category) {
          throw new Error("Không tìm thấy danh mục");
        }
        resolve(category);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
  getListCategory() {
    return new Promise(async function (resolve, reject) {
      try {
        const listCategory = await Categories.find({}, { __v: 0 })
          .sort({ createdAt: -1 })
          .populate({
            path: 'subcategory',
            model: 'SubCategories', // Should be "model" instead of "models"
            populate: {
              path: 'product',
              model: 'Product', // Should be "model" instead of "models"
              
            },
          })
          .exec();

        const responseData = listCategory.map(category => {
          return {
            status: true,
            _id: category._id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            subcategory: category.subcategory.map(sub => {
              return {
                _id: sub._id,
                name: sub.name,
                createdAt: sub.createdAt,
                updatedAt: sub.updatedAt,
                products: sub.product.map(product=>{
                  return{
                    _id: product._id,
                    name: product.name,
                    avartar:product.avartar,
                    img: product.img,
                    groupOption: product.groupOption,
                    description: product.description
                  }
                }), // Include the products
              };
            }),
          };
        });
        return resolve(responseData);
      } catch (err) {
        console.log(err);
        return reject(err);
      }
    });
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

module.exports = categoryService