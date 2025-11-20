import { Table, Spin, Alert } from 'antd'
import { useUsers } from '../hooks/useUsers'

function UsersList() {
  const { data: users = [], isLoading, isError, error } = useUsers()

  if (isLoading) return <Spin tip="Loading users..." />
  if (isError) return <Alert message="Error" description={error.message} type="error" showIcon />

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
  ]

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
    />
  )
}

export default UsersList
