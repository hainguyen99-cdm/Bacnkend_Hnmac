const { ResponseData } = require('../../helpers/response-data')
const ProductService = require('../services/Product-Services')

class ProductController {
    async delProduct(req, res) {
        try {
            const response = await ProductService.delproduct(req)
            console.log(Date.now())
            return res.json(new ResponseData(true, 'Xoa thanh cong', response).toJson())
          } catch (err) {
            console.log(Date.now())
            console.log(err)
            return res.json(new ResponseData(false, err.message).toJson())
          }
      }
  async createProduct(req, res) {
    try {
      const response = await ProductService.createproduct(req)
      if (response)      
        return res.json(new ResponseData(true, 'Create product success', response).toJson())
      return res.json(new ResponseData(false, 'Create product fail').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }

  async updateProduct(req, res) {
    try {
      const response = await ProductService.updateproduct(req)
      console.log(Date.now())
      return res.json(new ResponseData(true, 'Update product thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }

  async getListProduct(req, res) {
    try {
      const response = await ProductService.getListproduct(req)
      console.log(Date.now())
      return res.json(new ResponseData(true, 'Lay danh sach thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async getListProductByCate(req, res) {
    try {
      const response = await ServiceService.getListServiceByIdCategory(req)
      console.log(Date.now())
      return res.json(new ResponseData(true, 'Lay danh sach thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async addProductToCategory(req, res) {
    try {
      const response = await ProductService.addProductToCategory(req)
      console.log(Date.now())
      return res.json(new ResponseData(true, 'add thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
}

module.exports = new ProductController
