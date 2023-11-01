const { ResponseData } = require('../../helpers/response-data')
const SubCategoryService = require('../services/subcategory-service')
class SubCategoryController {
    async delSubCategory(req, res) {
        try {
            const response = await SubCategoryService.delSubCategory(req)
            console.log(Date.now())
            return res.json(new ResponseData(true, 'Xoa thanh cong', response).toJson())
          } catch (err) {
            console.log(Date.now())
            console.log(err)
            return res.json(new ResponseData(false, err.message).toJson())
          }
      }
  async createSubCategory(req, res) {
    try {
      const response = await SubCategoryService.createSubCategory(req)
      if (response)      
        return res.json(new ResponseData(true, 'Create  success', response).toJson())
      return res.json(new ResponseData(false, 'Create  fail').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }

  async updateSubCategory(req, res) {
    try {
      const response = await SubCategoryService.updateSubCategory(req)
      console.log(Date.now())
      return res.json(new ResponseData(true, 'Update thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }

  async getListSubCategory(req, res) {
    try {
      const response = await SubCategoryService.getListSubCategory(req)
      return res.json(new ResponseData(true, 'Lay danh sach thanh cong', response).toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
}

module.exports = new SubCategoryController
