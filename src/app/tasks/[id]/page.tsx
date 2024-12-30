'use client'

import { type RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'
import { setTodoTitle, toggleTodo } from '@/redux/todoSlice'
import Button from '@/components/Button/Button'
import FormItem from '@/components/FormItem/FormItem'
import css from './index.module.scss'
import { useTitle } from '@/context/TitleContext'

const TaskDetailPage: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { setTitle } = useTitle()

  const { id } = useParams()

  const todos = useSelector((state: RootState) => state.todos.todos)
  const todo = todos.find((todo) => todo.id === Number(id))

  const [isEdit, setIsEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(todo?.title ?? '')

  useEffect(() => {
    setTitle('Детали задачи')
  }, [setTitle])

  if (todo == null) {
    return <div>Задача не найдена</div>
  }

  const handleEdit: () => void = () => {
    if (isEdit) {
      dispatch(setTodoTitle({ id: todo.id, title: newTitle }))
    }
    setIsEdit(!isEdit)
  }

  const handleToggle: () => void = () => {
    dispatch(toggleTodo(todo.id))
  }
  const handleDoubleClick: () => void = () => {
    setIsEdit(true)
    setNewTitle(todo.title)
  }
  return (
    <FormItem>
      <div className={css.pageContainer}>
      <p className={css.title}>
        Заголовок:
        {isEdit
          ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => { setNewTitle(e.target.value) }}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit()
              }
            }}
          />
            )
          : (
          <strong onDoubleClick={handleDoubleClick}>{todo?.title}</strong>
            )}
      </p>
      <p className={css.status}>
        <strong>Статус:</strong>
        {todo?.completed ? 'Выполнена' : 'Не выполнена'}
      </p>
      <p>
        <strong>ID:{todo?.id}</strong>
      </p>
      <Button
        onClick={handleToggle}
        color={todo.completed ? 'primary' : 'default'}
      >
        {todo.completed ? ' Выполнено' : 'Не выполнено'}
      </Button>
      <Button onClick={() => { router.push('/') }}>Вернуться</Button>
      </div>
    </FormItem>
  )
}

export default TaskDetailPage
