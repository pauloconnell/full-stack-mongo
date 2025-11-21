import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice'
import { useUsers } from '../hooks/useUsers'

function LoginForm() {
  const [selectedEmail, setSelectedEmail] = useState('')
  const dispatch = useDispatch()
  const { data: users = [], isLoading } = useUsers()

  const handleLogin = (e) => {
    e.preventDefault()
    if (selectedEmail) {
      const user = users.find(u => u.email === selectedEmail)
      if (user) {
        dispatch(login(user))
      }
    }
  }

  if (isLoading) return <div className="text-center">Loading users...</div>

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Sign In
      </h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Select User
          </label>
          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choose a user...</option>
            {users.map(user => (
              <option key={user._id} value={user.email}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm