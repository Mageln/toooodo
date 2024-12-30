'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos } from '@/redux/todoSlice'
import TodoList from '../components/TodoList/TodoList'
import FormItem from '@/components/FormItem/FormItem'
import { type RootState } from '@/redux/store'
import { useTitle } from '@/context/TitleContext'
import { fetchTodos } from '@/utils/api'
import { Loader } from 'lucide-react'
import css from './page.module.scss'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { setTitle } = useTitle()

  useEffect(() => {
    setTitle('Список задач')
  }, [setTitle])

  useEffect(() => {
    const fetchTodosData = async (): Promise<void> => {
      try {
        setLoading(true)
        const todosFromApi = await fetchTodos()
        dispatch(setTodos(todosFromApi))
        localStorage.setItem('todos', JSON.stringify(todosFromApi))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка')
        const todosFromLocalStorage = localStorage.getItem('todos')
        if (todosFromLocalStorage != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          dispatch(setTodos(JSON.parse(todosFromLocalStorage)))
        }
      } finally {
        setLoading(false)
      }
    }

    if (todos.length === 0) {
      fetchTodosData().catch(console.error)
    }
  }, [dispatch, todos.length])

  return (
    <FormItem>

      {loading && (
        <div className={css.spinnerContainer}>
          <Loader className={css.animateSpin} size={40} />
        </div>
      )}
      {(error != null) && <p>Ошибка: {error}</p>}
      <TodoList />
    </FormItem>
  )
}

export default HomePage
