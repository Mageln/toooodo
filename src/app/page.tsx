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
import { useTitle } from '@/context/TitleContext'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { setTitle } = useTitle()

  useEffect(() => {
    setTitle('Список задач')
  }, [setTitle])

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

    const timeoutId = setTimeout(() => {
      if (loading) {
        setError('Загрузка занимает слишком много времени. Показ локальных задач.')
      }
    }, 2000)

    if (todos.length === 0) {
      fetchTodos().catch(console.error)
    }

    return () => { clearTimeout(timeoutId) }
  }, [dispatch, todos.length, loading])

  if (loading) return <p>Загрузка...</p>
  if (error != null) return <p>Ошибка: {error}</p>

  return (
    <FormItem>
      <Link href="/add-task">
        <Button>Добавить новую задачу</Button>
      </Link>
      <TodoList />
    </FormItem>
  )
}

export default HomePage
