'use client'
import React, { useEffect } from 'react'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import FormItem from '@/components/FormItem/FormItem'
import { useTitle } from '@/context/TitleContext'
import css from './index.module.scss'

const AddTaskPage: React.FC = () => {
  const { setTitle } = useTitle()

  useEffect(() => {
    setTitle('Добавить задачу')
  }, [setTitle])
  return (
    <div className={css.pageContainer}>
    <FormItem>
      <AddTaskForm />
    </FormItem>
    </div>
  )
}

export default AddTaskPage
