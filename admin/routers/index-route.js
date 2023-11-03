const {ResponseData} = require('../../helpers/response-data')
const express = require('express')
const router = express.Router()
const authRouter = require('./Auth-route')
const categoriesRouter = require('./category-route')
const subCategoriesRouter = require('./subcategory-route')
const isAdmin = require('../../middleware/checkAdmin')
const productRouter = require('./Product-route')
const crawl = require('./crawl-route')
const options = require('./Options-route')
const groupoptions = require('./GroupOption-route')
const middleware = require('./../../middleware/auth')



router.use('/auth',authRouter)

router.use(middleware)

router.use('/categories',isAdmin,categoriesRouter)
router.use('/subcategories',isAdmin,subCategoriesRouter)
router.use('/products',isAdmin,productRouter)
router.use('/crawl',crawl)
router.use('/options',isAdmin,options)
router.use('/groupoptions',isAdmin,groupoptions)





router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router
