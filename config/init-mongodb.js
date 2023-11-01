const mongoose = require('mongoose')
const config = require('./config')
const server = config.MONGODB_DATABASE_URL
const database =  config.MONGODB_DATABASE
const logger = require('../helpers/logger')('Init mongoose')

console.log(server+ '/' + database)
mongoose
  .connect(server + '/' + database, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    useFindAndModify: false,
    
    // useCreateIndex: true,
  })
  .catch((e) => {
    console.log(e.message)
  })

mongoose.connection.on('connected', () => {
  console.log(logger('Mongodb connected.......'))
})

mongoose.connection.on('error', (e) => {
  console.log(logger(e.message))
})

mongoose.connection.on('disconnected', () => {
  console.log(logger('mongodb connection is disconnected.'))
})

module.exports = mongoose.connection


