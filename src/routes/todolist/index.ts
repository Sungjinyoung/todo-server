import { Router } from 'express'
import { dbConnection } from '../../config/database'

const router = Router()

enum TODO_STATUS_ENUM {
  READY = 'ready',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}
interface SubItemInterface {
  description: string
  done: boolean
}

interface TodoItemInterface {
  id: number
  title: string
  description: string
  deadline: number
  status: TODO_STATUS_ENUM
  subItems?: SubItemInterface
}

const todoList: Array<TodoItemInterface> = [
  {
    id: 0,
    title: 'TodoList 제작하기',
    description: 'TodoList 클라이언트와 서버를 개발해야함',
    deadline: new Date('2022-01-30').getTime(),
    status: TODO_STATUS_ENUM.READY,
  },
]

router.get('/all', (req, res) => {
  dbConnection.query('SELECT * FROM USER', (err, result) => {
    if (err) console.error(err)
    res.send(result)
  })
})

// 특정 id todoList 받아오기
router.get('/get/:id', (req, res) => {
  const todoItem = todoList.find((item) => item.id === parseInt(req.params.id))
  res.send(todoItem)
})

router.post('/create', (req, res) => {
  const newTodoItem: TodoItemInterface = {
    id: todoList.length,
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    status: req.body.status,
    subItems: req.body.subItems,
  }
  todoList.push(newTodoItem)
  res.send(todoList)
})

router.post('/modify/:id', (req, res) => {
  const selectedIndex = todoList.findIndex(
    (item) => item.id === parseInt(req.params.id)
  )
  todoList[selectedIndex] = {
    ...todoList[selectedIndex],
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    status: req.body.status,
    subItems: req.body.subItems,
  }
})

export { router as TodoListRouter }
