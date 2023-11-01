const {ResponseData} = require('../../helpers/response-data')
const express = require('express')
const router = express.Router()

router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router
