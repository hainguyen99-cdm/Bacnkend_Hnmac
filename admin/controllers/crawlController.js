const { ResponseData } = require('../../helpers/response-data')
const crawlservice = require('../services/crawdata')

class CrawlController {

  async crawl(req, res) {
    try {

      const response = await crawlservice.crawl(req)
      if (response)      
        return res.json(new ResponseData(true, ' success').toJson())
      return res.json(new ResponseData(false, ' fail').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
}
module.exports = new CrawlController
