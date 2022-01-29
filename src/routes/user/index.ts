import { Router } from 'express'
import { dbConnection } from '../../config/database'
import { v4 } from 'uuid'

const router = Router()

interface registerDto {
  name: string
  id: string
  password: string
  birth: string
}

interface loginDto {
  id: string
  password: string
}

// 회원가입 API
router.post('/register', (req, res) => {
  const { name, id, password, birth }: registerDto = req.body

  // 필드값이 비어진 채로 데이터가 넘어온다면 예외처리
  if (!name || !id || !password || !birth) {
    res.status(404).send({ detail: '회원가입 정보를 확인해주세요.' })
    return
  }
  const uuid = v4()
  const user_id = uuid.replace(/-/gi, '')
  const registerQuery =
    'INSERT INTO USER(user_id, name, id, password, birth) VALUES(?, ?, ?, ?, ?)'
  const params = [user_id, name, id, password, birth]

  dbConnection.query(registerQuery, params, (err, result) => {
    if (err) {
      if (err.errno === 1062)
        res.status(400).send({ detail: '이미 사용중인 아이디입니다.' })
    } else if (result.password.length < 8) {
      res.status(400).send({ detail: '비밀번호는 8자 이상 작성해야합니다.' })
    }
    res.status(204)
  })
})

router.post('/login', (req, res) => {
  const { id, password }: loginDto = req.body
  const loginQuery = 'SELECT user_id FROM USER WHERE id=? AND password=?'
  const params = [id, password]
  dbConnection.query(loginQuery, params, (err, result) => {
    if (err) {
      console.log(err)
    } else if (result.length === 0) {
      res.status(400).send({ detail: '존재하지 않는 계정입니다.' })
    } else {
      const userId = result[0].user_id
      const getTodosQuery = 'SELECT * FROM TODO WHERE user_id=?'
      dbConnection.query(getTodosQuery, userId, (err, result) => {
        res.status(200).send({ data: result })
      })
    }
  })
})

export { router as UserRouter }
