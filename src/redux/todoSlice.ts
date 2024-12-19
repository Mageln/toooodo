'use client'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ITodo } from '../types/todo'

interface TodoState {
  todos: ITodo[]
}

const initialState: TodoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos (state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload
    },
    addTodo (state, action: PayloadAction<ITodo>) {
      state.todos.unshift(action.payload)
    },
    removeTodo (state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo (state, action: PayloadAction<number>) {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo != null) {
        todo.completed = !todo.completed
      }
    },
    setTodoTitle (state, action: PayloadAction<{ id: number, title: string }>) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo != null) {
        todo.title = action.payload.title
      }
    }
  }
})

export const { setTodos, addTodo, removeTodo, toggleTodo, setTodoTitle } =
  todoSlice.actions
export default todoSlice.reducer
