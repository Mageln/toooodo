import { type ITodo } from '@/types/todo'
import axios from 'axios'

export const fetchTodos = async (): Promise<ITodo[]> => {
  const response = await axios.get('https://dummyjson.com/todos')
  return response.data.todos
}
