const express = require('express')
const router = express.Router()
const {ResponseData} = require('../../helpers/response-data')
const AuthController = require('../controllers/Auth-Controller')
const verifyToken= require('../../middleware/auth')
const middleware = require('./../../middleware/auth')


router.post('/register',AuthController.registerUser)
router.post('/login',AuthController.LoginUser)
router.post('/token',middleware,AuthController.TokenUser)

router.delete('/logout',verifyToken,AuthController.LogoutUser)

router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router