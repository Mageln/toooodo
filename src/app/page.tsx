'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTodos } from '@/redux/todoSlice'
import TodoList from '../components/TodoList/TodoList'
import FormItem from '@/components/FormItem/FormItem'

import { useTitle } from '@/context/TitleContext'
import { fetchTodos } from '@/utils/api'
import { Loader, Loader2 } from 'lucide-react'
import css from './page.module.scss'
import { type ITodo } from '@/types/todo'
import Link from 'next/link'
import Button from '@/components/Button/Button'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const { setTitle } = useTitle()

  useEffect(() => {
    setTitle('Список задач')
  }, [setTitle])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const todosFromLocalStorage = localStorage.getItem('todos')
      if (todosFromLocalStorage != null) {
        const todos: ITodo[] = JSON.parse(todosFromLocalStorage)
        dispatch(setTodos(todos))
      } else {
        const fetchTodosData = async (): Promise<void> => {
          try {
            setLoading(true)
            const todosFromApi = await fetchTodos()
            dispatch(setTodos(todosFromApi))
            localStorage.setItem('todos', JSON.stringify(todosFromApi))
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка')
          } finally {
            setLoading(false)
          }
        }

        fetchTodosData().catch(console.error)
      }
    }
  }, [dispatch, isClient])

  if (!isClient) {
    return <div className={css.spinnerContainer}>
      <Loader2 className={css.animateSpin} size={30}/>
      </div>
  }

  return (
    <FormItem>
      {loading && (
        <div className={css.spinnerContainer}>
          <Loader className={css.animateSpin} size={40} />
        </div>
      )}
      {(error != null) && <p>Ошибка: {error}</p>}
      <TodoList />
        <Link className={css.addTask} href="/add-task">
              <Button>Добавить задачу</Button>
            </Link>
    </FormItem>
  )
}

export default HomePage
