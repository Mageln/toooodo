'use client'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ITodo } from '../types/todo'

const loadTodosFromLocalStorage = (): ITodo[] => {
  if (typeof window !== 'undefined') {
    const todos = localStorage.getItem('todos')
    return (todos != null) ? JSON.parse(todos) : []
  }
  return []
}

interface TodoState {
  todos: ITodo[]
}

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage()
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos (state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    addTodo (state, action: PayloadAction<ITodo>) {
      state.todos.unshift(action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    removeTodo (state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    toggleTodo (state, action: PayloadAction<number>) {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo != null) {
        todo.completed = !todo.completed
        localStorage.setItem('todos', JSON.stringify(state.todos))
      }
    },
    setTodoTitle (state, action: PayloadAction<{ id: number, title: string }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo != null) {
        todo.todo = action.payload.title
        localStorage.setItem('todos', JSON.stringify(state.todos))
      }
    },
    setTodoDescription (state, action: PayloadAction<{ id: number, description: string }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo != null) {
        todo.description = action.payload.description
        localStorage.setItem('todos', JSON.stringify(state.todos))
      }
    },
    filterTodos (state, action: PayloadAction<boolean>) {
      state.todos = state.todos.filter((todo) => todo.completed === action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    }
  }
})

export const { setTodos, addTodo, removeTodo, toggleTodo, setTodoTitle, setTodoDescription, filterTodos } =
  todoSlice.actions
export default todoSlice.reducer
