'use client'

import { type TitleProviderProps, type TitleContextType } from '@/types/todo'
import { createContext, useContext, useState } from 'react'

const TitleContext = createContext<{ title: string, setTitle: (title: string) => void } | undefined>(undefined)

export const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const [title, setTitle] = useState('Список задач')
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  )
}

export const useTitle = (): TitleContextType => {
  const context = useContext(TitleContext)
  if (context == null) {
    throw new Error('useTitle must be used within a TitleProvider');
  }
  return context
}
