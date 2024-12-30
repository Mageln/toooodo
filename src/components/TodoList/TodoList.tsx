'use client'
import { type RootState } from '../../redux/store'
import TodoItem from '../TodoItem/TodoItem'
import css from './index.module.scss'
import { useSelector } from 'react-redux'

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos)

  return (
    <div>
      {todos.length > 0
        ? (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )
        : (
        <li className={css.list}>Нет задач для отображения</li>
          )}
    </div>
  )
}

export default TodoList
