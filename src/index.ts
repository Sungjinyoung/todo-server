import bodyParser from 'body-parser'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import { TodoListRouter } from './routes/todolist/index'
import { UserRouter } from './routes/user'

const app = express()

// cors origin(교차 출처 리소스)으로 허용하고자 하는 url 추가
// cors 해결 방법
// 프록시 서버
// 헤더 추가
// 클라이언트에서 http proxy middle웨어 사용

// 로컽 테스트용
const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'http:localhost:3001'],
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use(cors(corsOptions))

app.use('/todolist', TodoListRouter)
app.use('/user', UserRouter)

app.listen(8080, () => {
  console.log('server is working now...')
})
