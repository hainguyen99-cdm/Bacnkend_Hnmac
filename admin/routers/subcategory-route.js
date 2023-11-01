const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const SubCategoriesController = require('../controllers/subcategory-Controller')
const verifyToken= require('../../middleware/auth')


router.post('/add',SubCategoriesController.createSubCategory)
router.post('/update',SubCategoriesController.updateSubCategory)
router.delete('/delete',SubCategoriesController.delSubCategory)
router.get('/getlistsubcategories',SubCategoriesController.getListSubCategory)



router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router