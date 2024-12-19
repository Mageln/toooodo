'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../redux/todoSlice'
import { type ITodo } from '../../types/todo'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    const newTodo: ITodo = {
      id: Date.now(),
      title,
      completed: false
    }
    dispatch(addTodo(newTodo))
    setTitle('')
    setTimeout(() => {
      router.push('/')
    }, 100)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        placeholder="Введите новую задачу"
        required
      />
      <Button>Сохранить</Button>
    </form>
  )
}

export default AddTaskForm
