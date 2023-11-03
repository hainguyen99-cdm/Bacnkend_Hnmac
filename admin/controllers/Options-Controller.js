const { ResponseData } = require('../../helpers/response-data')
const OptionService = require('../services/Options-Services')

class OptionsController {
    async delOPtion(req, res) {
        try {
            const response = await OptionService.deloption(req)
            console.log(Date.now())
            return res.json(new ResponseData(true, 'Xoa thanh cong', response).toJson())
        } catch (err) {
            console.log(Date.now())
            console.log(err)
            return res.json(new ResponseData(false, err.message).toJson())
        }
    }
    async createOption(req, res) {
        try {
            const response = await OptionService.createoption(req)
            if (response)
                return res.json(new ResponseData(true, 'Create  success', response).toJson())
            return res.json(new ResponseData(false, 'Create  fail').toJson())
        } catch (err) {
            console.log(Date.now())
            console.log(err)
            res.json(new ResponseData(false, err.message).toJson())
        }
    }

    async updateOption(req, res) {
        try {
            const response = await OptionService.updateoption(req)
            console.log(Date.now())
            return res.json(new ResponseData(true, 'Update product thanh cong', response).toJson())
        } catch (err) {
            console.log(Date.now())
            console.log(err)
            res.json(new ResponseData(false, err.message).toJson())
        }
    }

    async getListOption(req, res) {
        try {
            const response = await OptionService.getListoption(req)
            console.log(Date.now())
            return res.json(new ResponseData(true, 'Lay danh sach thanh cong', response).toJson())
        } catch (err) {
            console.log(Date.now())
            console.log(err)
            res.json(new ResponseData(false, err.message).toJson())
        }
    }

}

module.exports = new OptionsController
