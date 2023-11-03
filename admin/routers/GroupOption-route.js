const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const groupOptionsController = require('../controllers/groupOption-Controller')


router.post('/create',groupOptionsController.createGroupOption)
// router.post('/update',optionsController.updateOption)
// router.delete('/delete',optionsController.delOPtion)
// router.get('/',optionsController.getListOption)



router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router