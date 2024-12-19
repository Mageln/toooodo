'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios, { type AxiosResponse } from 'axios'
import { setTodos } from '@/redux/todoSlice'
import TodoList from '../components/TodoList/TodoList'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import FormItem from '@/components/FormItem/FormItem'
import { type ITodo } from '@/types/todo'
import { type RootState } from '@/redux/store'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      try {
        setLoading(true)
        const response: AxiosResponse<ITodo[]> = await axios.get(
          'https://jsonplaceholder.typicode.com/todos'
        )
        dispatch(setTodos(response.data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка')
      } finally {
        setLoading(false)
      }
    }

    if (todos.length === 0) {
      fetchTodos().catch(console.error)
    }
  }, [dispatch, todos.length])

  if (loading) return <p>Загрузка...</p>
  if (error != null) return <p>Ошибка: {error}</p>

  return (
    <FormItem>
      <h1>Список задач</h1>
      <Link href="/add-task">
        <Button>Добавить новую задачу</Button>
      </Link>
      <TodoList />
    </FormItem>
  )
}

export default HomePage
