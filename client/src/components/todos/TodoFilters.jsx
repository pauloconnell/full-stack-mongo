import { useSelector, useDispatch } from 'react-redux'
import { setFilters } from '../../store/slices/todosSlice'

const CATEGORIES = ['all', 'other', 'buy', 'fix', 'clean', 'exercise', 'research']
const PRIORITIES = [
  { value: 'all', label: 'All Priorities' },
  { value: '0', label: 'Normal' },
  { value: '1', label: 'High' },
  { value: '2', label: 'Urgent' }
]

function TodoFilters() {
  const { filters } = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }))
  }

  const handlePriorityChange = (priority) => {
    dispatch(setFilters({ priority }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.category === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {PRIORITIES.map(priority => (
              <button
                key={priority.value}
                onClick={() => handlePriorityChange(priority.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.priority === priority.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoFilters