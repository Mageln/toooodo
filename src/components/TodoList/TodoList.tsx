'use client'
import { type ITodo } from '@/types/todo'
import { type RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import TodoItem from '../TodoItem/TodoItem'
import css from './index.module.scss'
import { useEffect, useState } from 'react'
import { Search } from '../Search/Search'
import Select from '../Select/Select'

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all')
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>(todos)

  useEffect(() => {
    let filtered = [...todos]
    if (filter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed)
    } else if (filter === 'incomplete') {
      filtered = filtered.filter((todo) => !todo.completed)
    }
    setFilteredTodos(filtered)
  }, [filter, todos])

  const handleFilterChange = (filterType: 'all' | 'completed' | 'incomplete'): void => {
    setFilter(filterType)
  }

  if (todos.length === 0) {
    return <p>задачи отсутствуют</p>
  }

  const handleSearch = (query: string): void => {
    if (query === '') {
      setFilteredTodos(todos)
    } else {
      setFilteredTodos(
        todos.filter((todo) =>
          todo.todo.toLowerCase().includes(query.toLowerCase())
        )
      )
    }
  }

  return (
    <div className={css.container}>
        <div className={css.searchHead}>
      <Search onSearch={handleSearch}/>
        <Select filter={filter} onChange={handleFilterChange}/>
      </div>
      {filteredTodos.length === 0
        ? (
        <p>Задачи отсутствуют</p>
          )
        : (
            filteredTodos.map((todo: ITodo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
            ))
          )}
  </div>
  )
}

export default TodoList
