import axios from 'axios'

export const fetchTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
  return response.data.slice(0, 10)
}
