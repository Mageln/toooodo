'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../redux/todoSlice'
import { type ITodo } from '../../types/todo'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'
import css from './index.module.scss'

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    const randomUserId = Math.floor(Math.random() * 10000) + 1

    const newTodo: ITodo = {
      id: Date.now(),
      todo: title,
      completed: false,
      userId: randomUserId,
      description: ''
    }
    dispatch(addTodo(newTodo))
    setTitle('')
    setTimeout(() => {
      router.push('/')
    }, 100)
  }
  const handleBack = (): void => {
    router.back()
  }
  return (
    <form className={css.from} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        placeholder="Введите новую задачу"
        required
      />
      <Button>Добавить</Button>
      <Button onClick={handleBack}>Назад</Button>
    </form>

  )
}

export default AddTaskForm
