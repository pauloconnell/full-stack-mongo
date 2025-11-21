import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import TodoForm from './TodoForm'
import TodoFilters from './TodoFilters'
import TodoList from './TodoList'

function TodoApp() {
  const { currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white" data-testid="user-greeting">
          {currentUser?.name}'s Todos
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          data-testid="logout-button"
        >
          Logout
        </button>
      </div>
      
      <TodoForm />
      <TodoFilters />
      <TodoList />
    </div>
  )
}

export default TodoApp