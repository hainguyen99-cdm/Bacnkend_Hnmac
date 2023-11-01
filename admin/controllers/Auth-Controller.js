const AuthService = require('../services/Auth-Services')
const { ResponseData } = require('../../helpers/response-data')
class AuthController {
    async registerUser(req, res) {
        try {
         
          const response = await AuthService.registerUser(req)
          if (response)      
            return res.json(new ResponseData(true, 'Dang ky thanh cong').toJson())
          return res.json(new ResponseData(false, 'Dang ky that bai').toJson())
        } catch (err) {
          console.log(Date.now())
          console.log(err)
          res.json(new ResponseData(false, err.message).toJson())
        }
      }
      async LoginUser(req, res) {
        try {
          const response = await AuthService.LoginUser(req)
          if (response)      
            return res.json(new ResponseData(true, 'Dang nhap thanh cong',response).toJson())
          return res.json(new ResponseData(false, 'Dang nhap that bai').toJson())
        } catch (err) {
          console.log(Date.now())
          console.log(err)
          res.json(new ResponseData(false, err.message).toJson())
        }
      }
      async LogoutUser(req, res) {
        try {
         
          const response = await AuthService.LogoutUser(req)
          if (response)      
            return res.json(new ResponseData(true, 'Dang xuat thanh cong').toJson())
          return res.json(new ResponseData(false, 'Dang xuat that bai').toJson())
        } catch (err) {
          console.log(Date.now())
          console.log(err)
          res.json(new ResponseData(false, err.message).toJson())
        }
      }
      async TokenUser(req, res) {
        try {
         
          const response = await AuthService.Token(req)
          if (response)      
            return res.json(new ResponseData(true, 'Token thanh cong',response).toJson())
          return res.json(new ResponseData(false, 'Token that bai').toJson())
        } catch (err) {
          console.log(Date.now())
          console.log(err)
          res.json(new ResponseData(false, err.message).toJson())
        }
      }


}
module.exports = new AuthController