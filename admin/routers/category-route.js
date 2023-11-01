const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const CategoriesController = require('../controllers/category-Controller')
const verifyToken= require('../../middleware/auth')


router.post('/add',CategoriesController.createCategory)
router.post('/update',CategoriesController.updateCategory)
router.delete('/delete',CategoriesController.delCategory)
router.get('/getlistcategories',CategoriesController.getListCategory)



router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router