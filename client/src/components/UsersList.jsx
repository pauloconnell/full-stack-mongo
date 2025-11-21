import { Spin, Alert } from 'antd'
import { useUsers } from '../hooks/useUsers'

function UsersList() {
  const { data: users = [], isLoading, isError, error } = useUsers()

  if (isLoading) return <div className="flex justify-center p-4"><Spin tip="Loading users..." /></div>
  if (isError) return <Alert message="Error" description={error.message} type="error" showIcon />

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-4 text-gray-800 dark:text-gray-200">Name</th>
              <th className="text-left py-2 px-4 text-gray-800 dark:text-gray-200">Email</th>
              <th className="text-left py-2 px-4 text-gray-800 dark:text-gray-200">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{user.name}</td>
                <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{user.email}</td>
                <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersList
