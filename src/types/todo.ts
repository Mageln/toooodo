import { type ReactNode } from 'react'

export interface ITodo {
  id: number
  title: string
  completed: boolean
}

export interface TitleContextType {
  title: string
  setTitle: (title: string) => void
}

export interface TitleProviderProps {
  children: ReactNode
}
