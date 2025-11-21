import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import { useUsers } from '../../hooks/useUsers'

function LoginForm() {
  const [selectedName, setSelectedName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { data: users = [], isLoading: usersLoading } = useUsers()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (selectedName && email) {
      setIsLoading(true)
      setError('')
      
      try {
        const res = await fetch('http://localhost:4000/api/auth/login', {       // no need for react Querry here - just a one time call with no caching refetching or background updates needed
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: selectedName, email })
        })
        
        if (res.ok) {
          const user = await res.json()
          dispatch(login(user))
        } else {
          const errorData = await res.json()
          setError(errorData.message || 'Login failed')
        }
      } catch (err) {
        setError('Network error. Please try again.', err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (usersLoading) return <div className="text-center">Loading users...</div>

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
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choose a user...</option>
            {users.map(user => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm