const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const crawlController = require('../controllers/crawlController')


router.get('/',crawlController.crawl)
router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router