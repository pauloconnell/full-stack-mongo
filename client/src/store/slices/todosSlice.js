import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    filters: {
      category: 'all',
      priority: 'all',
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setTodos: (state, action) => {
      state.items = action.payload
    },
    addTodo: (state, action) => {
      state.items.push(action.payload)
    },
    updateTodo: (state, action) => {
      const index = state.items.findIndex(todo => todo._id === action.payload._id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo._id !== action.payload)
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setLoading, setTodos, addTodo, updateTodo, deleteTodo, setFilters } = todosSlice.actions
export default todosSlice.reducer