require('dotenv').config();
const route = require('./routes/index-routes')
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
const cors = require('cors')
const  port  = process.env.PORT||3000


require('./config/init-mongodb')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())


route(app);

global.dataCache = new Map()
app.listen(port, () => {
    console.log(`Node server running @ http://localhost:${port}`)
})