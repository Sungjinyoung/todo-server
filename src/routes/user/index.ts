import { Router } from 'express'
import { dbConnection } from '../../config/database'
import { v4 } from 'uuid'

const router = Router()

interface registerDto {
  name: string
  id: string
  password: string
  birth: number
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
    res.status(400).json({ detail: '회원가입 정보를 확인해주세요.' })
  }

  // res.json()는 인자에 따라 content-type이 자동으로 설정됨
  const idRegExp = /^[\w]*$/g
  if (!idRegExp.test(id)) res.status(400).json({ detail: '사용할 수 없는 아이디입니다. 영어, 숫자로 아이디를 생성해주세요.' })

  const koreanRegExp = /^[가-힣]*$/g
  if (!koreanRegExp.test(name)) res.status(400).json({ detail: '올바르지 않은 이름입니다.' })

  if (password.length < 8) res.status(400).json({ detail: '비밀번호는 8자 이상 작성해야합니다.' })

  const uuid = v4()
  const user_id = uuid.replace(/-/gi, '')
  const registerQuery = 'INSERT INTO USER(user_id, name, id, password, birth) VALUES(?, ?, ?, ?, ?)'
  const params = [user_id, name, id, password, birth]

  dbConnection.query(registerQuery, params, (err, result) => {
    if (err) {
      console.log(err)
      if (err.errno === 1062) res.status(400).json({ detail: '이미 사용중인 아이디입니다.' })
    } else if (result) {
      res.status(201).json({ success: true })
    }
  })
})

router.post('/login', (req, res) => {
  const { id, password }: loginDto = req.body
  if (!id || !password) res.json(400).json({ detail: 'Check your login form' })
  const loginQuery = 'SELECT user_id FROM USER WHERE id=? AND password=?'
  const params = [id, password]
  dbConnection.query(loginQuery, params, (err, result) => {
    if (err) {
      res.status(500)
    } else if (result.length === 0) {
      res.status(400).json({ detail: '존재하지 않는 계정입니다.' })
    } else {
      const userId = result[0].user_id
      res.status(200).send({ success: true, user_id: userId })
    }
  })
})

export { router as UserRouter }
