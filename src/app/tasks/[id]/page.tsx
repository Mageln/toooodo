/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { type RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'
import { setTodoTitle, setTodoDescription, toggleTodo } from '@/redux/todoSlice'
import Button from '@/components/Button/Button'
import FormItem from '@/components/FormItem/FormItem'
import css from './index.module.scss'
import { useTitle } from '@/context/TitleContext'
import { Save, X } from 'lucide-react'
import cn from 'classnames'

const TaskDetailPage: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { setTitle } = useTitle()

  const { id } = useParams()

  const todos = useSelector((state: RootState) => state.todos.todos)
  const todo = todos.find((todo) => todo.id === Number(id))

  const [isEditTitle, setIsEditTitle] = useState(false)
  const [isEditDescription, setIsEditDescription] = useState(false)
  const [newTitle, setNewTitle] = useState(todo?.todo ?? '')
  const [newDescription, setNewDescription] = useState(todo?.description ?? '')

  useEffect(() => {
    setTitle('Детали задачи')
  }, [setTitle])

  if (todo == null) {
    return <div>Задача не найдена</div>
  }

  const handleToggle: () => void = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleEditSave = (): void => {
    if (newTitle !== todo?.todo) {
      dispatch(setTodoTitle({ id: todo.id, title: newTitle }))
    }
    if (newDescription !== todo?.description) {
      dispatch(setTodoDescription({ id: todo.id, description: newDescription }))
    }
    setIsEditTitle(false)
    setIsEditDescription(false)
  }

  const handleEditCancel = (): void => {
    setNewTitle(todo?.todo ?? '')
    setNewDescription(todo?.description ?? '')
    setIsEditTitle(false)
    setIsEditDescription(false)
  }

  const handleDoubleClick = (field: 'title' | 'description'): void => {
    if (field === 'title') {
      setIsEditTitle(true)
      setNewTitle(todo?.todo ?? '')
    } else if (field === 'description') {
      setIsEditDescription(true)
      setNewDescription(todo?.description ?? '')
    }
  }

  return (
    <FormItem>
      <div className={css.pageContainer}>
        <p className={css.title}>
          Заголовок:
          {isEditTitle
            ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.target.value) }}
                className={css.editInput}
              />
              )
            : (
              <strong
                className={css.todoTitle}
                onDoubleClick={() => { handleDoubleClick('title') }}
              >
                {todo?.todo}
              </strong>
              )}
        </p>

        <div className={css.todoItem}>
          <p className={cn(css.status, { [css.completed]: todo.completed })}>
            <strong>Статус:</strong> {todo?.completed ? 'Выполнена' : 'Не выполнена'}
          </p>
        </div>

        <div className={css.todoItem}>
          <p>
            <strong>ID: {todo?.id}</strong>
          </p>
        </div>

        <div className={css.todoItem}>
          <p className={css.description}>
            <strong>Описание:</strong>
            {isEditDescription
              ? (
                <textarea
                  value={newDescription}
                  onChange={(e) => { setNewDescription(e.target.value) }}
                  className={css.editInput}
                  rows={4}
                  placeholder="Введите описание задачи"
                />
                )
              : (
                <p className={css.textDescription} onDoubleClick={() => { handleDoubleClick('description') }}>
                  {todo?.description || 'Нет описания'}
                </p>
                )}
          </p>
        </div>

        <div className={css.buttons}>
          <Button
            className={css.toggleButton}
            onClick={handleToggle}
            color={todo.completed ? 'primary' : 'default'}
          >
            {todo.completed ? 'Выполнено' : 'Не выполнено'}
          </Button>
          <Button className={css.backButton} onClick={() => { router.push('/') }}>Вернуться</Button>

          {(isEditTitle || isEditDescription) && (
            <div className={css.editButtons}>
              <Button onClick={handleEditSave} color="secondary"><Save size={15}/></Button>
              <Button onClick={handleEditCancel} color="secondary"><X size={15}/></Button>
            </div>
          )}
        </div>
      </div>
    </FormItem>
  )
}

export default TaskDetailPage
