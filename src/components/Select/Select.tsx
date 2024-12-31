import { type FilterSelectProps } from '@/types/todo'
import React from 'react'
import css from './index.module.scss'

const Select: React.FC<FilterSelectProps> = ({ filter, onChange }): JSX.Element => {
  return (
    <div className={css.selectContainer}>
    <select value={filter} onChange={(e) => { onChange(e.target.value as 'all' | 'completed' | 'incomplete') }}>
      <option value="all">Все</option>
      <option value="completed">Выполненные</option>
      <option value="incomplete">Невыполненные</option>
    </select>
  </div>
  )
}

export default Select
