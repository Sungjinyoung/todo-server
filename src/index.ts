import bodyParser from 'body-parser'
import express from 'express'
const todoListRouter = require('./todolist/index.ts')

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
app.use('/todolist', todoListRouter)
app.listen(8080, () => {
  console.log('server is working now...')
})
