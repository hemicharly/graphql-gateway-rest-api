const path = require('path')
const dotenv = require('dotenv')

module.exports = (function () {
  dotenv.config({
    path: path.join(__dirname, '.env')
  })

  return {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    acquireConnectionTimeout: 8000
  }
})()
