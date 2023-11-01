const {ResponseData} = require('../helpers/response-data')
const {ClientRouter} = require('../client/index')
const {AdminRouter} = require('../admin/index')

function route(app) {

  app.use('/api/v1/admin', AdminRouter)

  app.use('/api/v1/client', ClientRouter)

  app.use('/', (req, res) => {
    return res.status(404).json(new ResponseData(false, "Not found").toJson())
  })
}

module.exports = route
