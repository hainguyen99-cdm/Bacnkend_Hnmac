module.exports = {
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'hnmac',
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'hnmac',
  MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL || 'mongodb://127.0.0.1:27017'
}