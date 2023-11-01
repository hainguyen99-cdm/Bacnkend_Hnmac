const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const ProductController = require('../controllers/Products-Controller')
const verifyToken= require('../../middleware/auth')


router.post('/add',ProductController.createProduct)
router.post('/update',ProductController.updateProduct)
router.post('/addcategories',ProductController.addProductToCategory)

router.delete('/delete',ProductController.delProduct)
router.get('/getlistproduct',ProductController.getListProduct)



router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router