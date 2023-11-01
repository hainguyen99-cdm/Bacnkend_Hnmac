const {ResponseData} = require('../../helpers/response-data')
const express = require('express')
const router = express.Router()
const authRouter = require('./Auth-route')
const categoriesRouter = require('./category-route')
const subCategoriesRouter = require('./subcategory-route')

const productRouter = require('./Product-route')
const crawl = require('./crawl-route')




router.use('/auth',authRouter)
router.use('/categories',categoriesRouter)
router.use('/subcategories',subCategoriesRouter)
router.use('/products',productRouter)
router.use('/crawl',crawl)



router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router
