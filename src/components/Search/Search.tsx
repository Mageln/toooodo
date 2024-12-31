import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import css from './index.module.scss'

interface SearchProps {
  onSearch: (query: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }): JSX.Element => {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className={css.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Поиск по названию"
      />
      <SearchIcon size={15}/>
    </div>
  )
}
