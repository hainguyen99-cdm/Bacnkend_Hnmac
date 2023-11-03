const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const SubCategoriesController = require('../controllers/Subcategory-Controller')
const verifyToken= require('../../middleware/auth')


router.post('/create',SubCategoriesController.createSubCategory)
router.post('/update',SubCategoriesController.updateSubCategory)
router.delete('/delete',SubCategoriesController.delSubCategory)
router.get('/getlistsubcategories',SubCategoriesController.getListSubCategory)



router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router