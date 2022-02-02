import { Router } from 'express'
import { dbConnection } from '../../config/database'

const router = Router()

router.get('/all', (req, res) => {
  const { userId } = req.query
  console.log(userId)
  dbConnection.query('SELECT * FROM TodoItem where user_id=?', userId, (err, result) => {
    if (err) {
      console.log(err)
      res.send(500).send('Internal Server Error')
    } else if (result) {
      res.status(200).send(result)
    }
  })
})

export { router as TodoListRouter }
