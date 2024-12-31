import { type ReactNode } from 'react'

export interface ITodo {
  description: string
  id: number
  todo: string
  completed: boolean
  userId: number
}

export interface TitleContextType {
  title: string
  setTitle: (title: string) => void
}

export interface TitleProviderProps {
  children: ReactNode
}

export interface FilterSelectProps {
  filter: 'all' | 'completed' | 'incomplete'
  onChange: (filter: 'all' | 'completed' | 'incomplete') => void
}
