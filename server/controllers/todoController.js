import Todo from '../models/Todo.js'

// Get all todos for a user
const getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId })
      .sort({ priority: -1, createdAt: -1 }) // Sort by priority desc, then newest first
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.params.userId,
      ...req.body
    })
    const savedTodo = await todo.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    res.json(todo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    res.json({ message: 'Todo deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getUserTodos,
  createTodo,
  updateTodo,
  deleteTodo
}