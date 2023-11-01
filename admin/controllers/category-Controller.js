const { ResponseData } = require('../../helpers/response-data')
const CategoryService = require('../services/category-service')
class CategoryController {
    async delCategory(req, res) {
        try {
            const response = await CategoryService.delCategory(req)
            console.log(Date.now())
            return res.json(new ResponseData(true, 'Xoa thanh cong', response).toJson())
          } catch (err) {
            console.log(Date.now())
            console.log(err)
            return res.json(new ResponseData(false, err.message).toJson())
          }
      }
  async createCategory(req, res) {
    try {
      const response = await CategoryService.createCategory(req)
      if (response)      
        return res.json(new ResponseData(true, 'Create  success', response).toJson())
      return res.json(new ResponseData(false, 'Create  fail').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }

  async updateCategory(req, res) {
    try {
      const response = await CategoryService.updateCategory(req)
      console.log(Date.now())
      return res.json(new ResponseData(true, 'Update thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }

  async getListCategory(req, res) {
    try {
      const response = await CategoryService.getListCategory(req)
      return res.json(new ResponseData(true, 'Lay danh sach thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
}

module.exports = new CategoryController
