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
      localStorage.setItem('todos', JSON.stringify(state.todos)) // Сохраняем в localStorage
    },
    addTodo (state, action: PayloadAction<ITodo>) {
      state.todos.unshift(action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos)) // Сохраняем в localStorage
    },
    removeTodo (state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos)) // Сохраняем в localStorage
    },
    toggleTodo (state, action: PayloadAction<number>) {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo != null) {
        todo.completed = !todo.completed
        localStorage.setItem('todos', JSON.stringify(state.todos)) // Сохраняем в localStorage
      }
    },
    setTodoTitle (state, action: PayloadAction<{ id: number, title: string }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo != null) {
        todo.title = action.payload.title
        localStorage.setItem('todos', JSON.stringify(state.todos)) // Сохраняем в localStorage
      }
    },
    filterTodos (state, action: PayloadAction<boolean>) {
      state.todos = state.todos.filter((todo) => todo.completed === action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos)) // Сохраняем в localStorage
    }
  }
})

export const { setTodos, addTodo, removeTodo, toggleTodo, setTodoTitle, filterTodos } =
  todoSlice.actions
export default todoSlice.reducer
