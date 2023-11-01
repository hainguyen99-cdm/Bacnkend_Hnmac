const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'cookie' + '.txt')
  }
})
 
module.exports = multer({ storage: storage })