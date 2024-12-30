'use client'
import { type ITodo } from '@/types/todo'
import { type RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from '../TodoItem/TodoItem'
import css from './index.module.scss'
import Button from '../Button/Button'
import { useState } from 'react'
import { filterTodos, setTodos } from '@/redux/todoSlice'
import { fetchTodos } from '@/utils/api'

const TodoList: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all')

  const handleFilterChange = (filterType: 'all' | 'completed' | 'incomplete'): void => {
    setFilter(filterType)
    if (filterType === 'completed') {
      dispatch(filterTodos(true))
    } else if (filterType === 'incomplete') {
      dispatch(filterTodos(false))
    } else {
      fetchTodos().then((todos) => dispatch(setTodos(todos))).catch(console.error)
    }
  }

  if (todos.length === 0) {
    return <p>задачи отсутствуют</p>
  }

  return (
    <div className={css.container}>
        <div className={css.filterButtons}>
        <Button onClick={() => { handleFilterChange('all') }}>Все</Button>
        <Button color="primary" onClick={() => { handleFilterChange('completed') }}>Выполненные</Button>
        <Button color="danger" onClick={() => { handleFilterChange('incomplete') }}>Невыполненные</Button>
      </div>
    {todos.map((todo: ITodo) => (
      <div key={todo.id}>
        <TodoItem key={todo.id} todo={todo} />

      </div>
    ))}
  </div>
  )
}

export default TodoList
