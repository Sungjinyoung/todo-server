import bodyParser from 'body-parser'
import express from 'express'

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

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

// 모든 todoList 받아오기
app.get('//todolistall', (req, res) => {
  res.send(todoList)
})

// 특정 id todoList 받아오기

//
app.get('//todolistget/:id', (req, res) => {
  const todoItem = todoList.find((item) => item.id === parseInt(req.params.id))
  res.send(todoItem)
})

app.post('/todolist/create', (req, res) => {
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

// app.post('/todolist/create', (req, res) => {
//   const { title, description, deadline, isCompleted } = req.body
//   const newTodoItem = {
//     id: todoList.length + 1,
//     title: title,
//     description: description,
//     deadline: deadline,
//     isCompleted: isCompleted
//   }
//   todoList.push(newTodoItem)
//   res.send(newTodoItem)
// })

// app.post('/todolist/modify/:id', (req, res) => {
//   const modifyItem = todoList.find(item => item.id === parseInt(req.params.id))
//   const index = todoList.findIndex(deleteItem)
//   todoList[index] = req.body
// })

// app.post('/todolist/delete/:id', (req, res) => {
//   const deleteItem = todoList.find(item => item.id === parseInt(req.params.id))
//   const index = todoList.findIndex(deleteItem)
//   todoList.splice(index, 1)
// })

app.listen(8080, () => {
  console.log('server is working now...')
})
