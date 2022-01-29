import mysql, { MysqlError } from 'mysql'

import dotenv from 'dotenv'
dotenv.config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const dbConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: 3306,
})

dbConnection.connect((err: MysqlError) => {
  if (err) console.error('error: ' + err)
})

export { dbConnection }
