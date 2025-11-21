import { useSelector } from 'react-redux'
import { useTodos, useUpdateTodo, useDeleteTodo } from '../../hooks/useTodos'

const PRIORITY_COLORS = {
  0: 'border-l-gray-400',
  1: 'border-l-yellow-500',
  2: 'border-l-red-500'
}

const PRIORITY_LABELS = {
  0: 'Normal',
  1: 'High', 
  2: 'Urgent'
}

const CATEGORIES = ['other', 'buy', 'fix', 'clean', 'exercise', 'research']

function TodoList() {
  const { currentUser } = useSelector(state => state.auth)
  const { filters } = useSelector(state => state.todos)
  
  const { data: todos = [], isLoading } = useTodos(currentUser?._id)
  const updateTodo = useUpdateTodo(currentUser?._id)
  const deleteTodo = useDeleteTodo(currentUser?._id)

  const filteredTodos = todos.filter(todo => {
    if (filters.category !== 'all' && todo.category !== filters.category) return false
    if (filters.priority !== 'all' && todo.priority !== Number(filters.priority)) return false
    return true
  })

  // Group todos by category and sort by priority within each category
  const todosByCategory = CATEGORIES.reduce((acc, category) => {
    const categoryTodos = filteredTodos
      .filter(todo => todo.category === category)
      .sort((a, b) => b.priority - a.priority || new Date(b.createdAt) - new Date(a.createdAt))
    
    if (categoryTodos.length > 0) {
      acc[category] = categoryTodos
    }
    return acc
  }, {})

  const handleToggleComplete = (todo) => {
    updateTodo.mutate({
      id: todo._id,
      completed: !todo.completed
    })
  }

  const handleDelete = (todoId) => {
    deleteTodo.mutate(todoId)
  }

  if (isLoading) return <div className="text-center py-4">Loading todos...</div>

  const renderTodo = (todo) => (
    <div
      key={todo._id}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-l-4 ${PRIORITY_COLORS[todo.priority]} ${
        todo.completed ? 'opacity-60' : ''
      }`}
      data-testid="todo-item"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            data-testid="todo-checkbox"
          />
          <div className="flex-1">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
              {todo.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className={`font-medium ${todo.priority === 2 ? 'text-red-600' : todo.priority === 1 ? 'text-yellow-600' : 'text-gray-600'}`}>
                {PRIORITY_LABELS[todo.priority]}
              </span>
              <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleDelete(todo._id)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          ✕
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {Object.keys(todosByCategory).length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No todos found. Add one above!
        </p>
      ) : (
        Object.entries(todosByCategory).map(([category, categoryTodos]) => (
          <div key={category} className="space-y-3" data-testid={`category-${category}`}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize border-b border-gray-200 dark:border-gray-700 pb-2">
              {category} ({categoryTodos.length})
            </h3>
            <div className="space-y-2">
              {categoryTodos.map(renderTodo)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default TodoList