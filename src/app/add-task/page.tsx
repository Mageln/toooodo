import React from 'react'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import FormItem from '@/components/FormItem/FormItem'

const AddTaskPage: React.FC = () => {
  return (
    <FormItem>
      <h1>Добавить задачу</h1>
      <AddTaskForm />
    </FormItem>
  )
}

export default AddTaskPage
