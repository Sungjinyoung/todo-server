const express = require("express")

const app = express()



const todoList = [
  { id: 0, title: "TodoList 제작하기", description: "TodoList 클라이언트와 서버를 개발해야함", deadline: new Date().getTime(), isCompleted: false }
]


// 모든 todoList 받아오기
app.get('/todolist/all', (req, res) => {
  res.send(todoList)
})

//특정 id todoList 받아오기

app.get('/todolist/:id', (req, res) => {
  const todoItem = todoList.find(item => item.id === parseInt(req.params.id)) 
})

app.post('/todolist/create', (req, res) => {
  const { title, description, deadline, isCompleted } = req.body
  const newTodoItem = {
    id: todoList.length + 1,
    title: title,
    description: description,
    deadline: deadline,
    isCompleted: isCompleted
  }
  todoList.push(newTodoItem)
  res.send(newTodoItem)
})

app.post('/todolist/modify/:id', (req, res) => {
  const modifyItem = todoList.find(item => item.id === parseInd(req.params.id))
  const index = todoList.findIndex(deleteItem)
  todoList[index] = req.body
})

app.post('/todolist/delete/:id', (req, res) => {
  const deleteItem = todoList.find(item => item.id === parseInt(req.params.id))
  const index = todoList.findIndex(deleteItem)
  todoList.splice(index, 1)
})

app.listen(3000, () => {
  console.log('server is working now...')
})