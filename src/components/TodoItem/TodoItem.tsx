'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, removeTodo } from '../../redux/todoSlice'
import { type ITodo } from '../../types/todo'
import Link from 'next/link'
import Button from '../Button/Button'
import cn from 'classnames'
import css from './index.module.scss'

const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const dispatch = useDispatch()

  const handleToggle = (): void => {
    dispatch(toggleTodo(todo.id))
  }

  const handleRemove = (): void => {
    dispatch(removeTodo(todo.id))
  }

  return (
    <div className={cn(css['todo-card'], { [css.completed]: todo.completed })}>
    <li className={css.list}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <Link className={css.link} href={`/tasks/${todo.id}`}>
        <span className={cn(css.title, { [css.completed]: todo.completed })}>
          {todo.title}
        </span>
      </Link>

      <Button color="danger" onClick={handleRemove}>
        Удалить
      </Button>
    </li>
    </div>
  )
}

export default TodoItem
