import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setTodos, addTodo, updateTodo, deleteTodo } from '../store/slices/todosSlice'

const API_BASE = 'http://localhost:4000/api'

export function useTodos(userId) {
  const dispatch = useDispatch()
  
  return useQuery({
    queryKey: ['todos', userId],
    queryFn: async () => {
      console.log('Fetching todos for user:', userId)
      const res = await fetch(`${API_BASE}/users/${userId}/todos`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const todos = await res.json()
      console.log('Fetched todos:', todos)
      dispatch(setTodos(todos))
      return todos
    },
    enabled: !!userId
  })
}

export function useCreateTodo(userId) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  
  return useMutation({
    mutationFn: async (todoData) => {
      console.log('Creating todo:', todoData, 'for user:', userId)
      const res = await fetch(`${API_BASE}/users/${userId}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const result = await res.json()
      console.log('Todo created:', result)
      return result
    },
    onSuccess: (newTodo) => {
      console.log('Adding todo to Redux:', newTodo)
      dispatch(addTodo(newTodo))
      queryClient.invalidateQueries(['todos', userId])
    },
    onError: (error) => {
      console.error('Error creating todo:', error)
    }
  })
}

export function useUpdateTodo(userId) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      return res.json()
    },
    onSuccess: (updatedTodo) => {
      dispatch(updateTodo(updatedTodo))
      queryClient.invalidateQueries(['todos', userId])
    }
  })
}

export function useDeleteTodo(userId) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  
  return useMutation({
    mutationFn: async (todoId) => {
      await fetch(`${API_BASE}/todos/${todoId}`, {
        method: 'DELETE'
      })
      return todoId
    },
    onSuccess: (todoId) => {
      dispatch(deleteTodo(todoId))
      queryClient.invalidateQueries(['todos', userId])
    }
  })
}