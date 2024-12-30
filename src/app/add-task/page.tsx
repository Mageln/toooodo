'use client'
import React, { useEffect } from 'react'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import FormItem from '@/components/FormItem/FormItem'
import { useTitle } from '@/context/TitleContext'

const AddTaskPage: React.FC = () => {
  const { setTitle } = useTitle()

  useEffect(() => {
    setTitle('Добавить задачу')
  }, [setTitle])
  return (
    <FormItem>
      <AddTaskForm />
    </FormItem>
  )
}

export default AddTaskPage
