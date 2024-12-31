'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, removeTodo, setTodoTitle } from '../../redux/todoSlice'
import { type ITodo } from '../../types/todo'
import Link from 'next/link'
import Button from '../Button/Button'
import cn from 'classnames'
import css from './index.module.scss'
import { PenBox, Save, Trash2Icon, X } from 'lucide-react'

const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(todo.todo)

  const handleToggle = (): void => {
    dispatch(toggleTodo(todo.id))
  }

  const handleRemove = (): void => {
    dispatch(removeTodo(todo.id))
  }

  const handleEdit = (): void => {
    setIsEditing(true)
  }

  const handleSave = (): void => {
    if (newTitle.trim().length > 0) {
      dispatch(setTodoTitle({ id: todo.id, title: newTitle }))
      setIsEditing(false)
    }
  }

  const handleCancel = (): void => {
    setNewTitle(todo.todo)
    setIsEditing(false)
  }

  useEffect(() => {
    setNewTitle(todo.todo)
  }, [todo.todo])

  return (
    <div className={cn(css['todo-card'], { [css.completed]: todo.completed })}>
      <li className={css.list}>
        <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
          {isEditing
            ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => { setNewTitle(e.target.value) }}
              className={css.editInput}
            />
              )
            : (
              <Link href={`/tasks/${todo.id}`}>
            <span className={cn(css.title, { [css.completed]: todo.completed })}>
              {todo.todo}
            </span>
            </Link>
              )}
        <div>
          {isEditing
            ? (
            <>
              <Button color="primary" className={css.save} onClick={handleSave}>
                <Save/>
              </Button>
              <Button color="danger" className={css.cancel} onClick={handleCancel}>
                <X/>
              </Button>
            </>
              )
            : (
            <Button color="secondary" className={css.edit} onClick={handleEdit}>
              <PenBox />
            </Button>
              )}
          <Button color="secondary" className={css.button} onClick={handleRemove}>
            <Trash2Icon />
          </Button>
        </div>
      </li>
    </div>
  )
}

export default TodoItem
