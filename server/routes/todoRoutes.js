import express from 'express'
import { getUserTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js'

const router = express.Router()

// User-specific todo routes
router.get('/users/:userId/todos', getUserTodos)
router.post('/users/:userId/todos', createTodo)

// General todo routes
router.put('/todos/:id', updateTodo)
router.delete('/todos/:id', deleteTodo)

export default router