import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useCreateTodo } from '../../hooks/useTodos'

const CATEGORIES = ['other', 'buy', 'fix', 'clean', 'exercise', 'research']
const PRIORITIES = [
  { value: 0, label: 'Normal', color: 'text-gray-600' },
  { value: 1, label: 'High', color: 'text-yellow-600' },
  { value: 2, label: 'Urgent', color: 'text-red-600' }
]

function TodoForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('buy')
  const [priority, setPriority] = useState(0)
  
  const { currentUser } = useSelector(state => state.auth)
  const createTodo = useCreateTodo(currentUser?._id)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      createTodo.mutate({
        title: title.trim(),
        category,
        priority: Number(priority)
      })
      setTitle('')
      setCategory('buy')
      setPriority(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="todo-input"
            required
          />
        </div>
        
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="category-select"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="priority-select"
          >
            {PRIORITIES.map(p => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={createTodo.isLoading}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        data-testid="add-todo"
      >
        {createTodo.isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  )
}

export default TodoForm