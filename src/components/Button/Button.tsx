import React from 'react'
import cn from 'classnames'
import css from './index.module.scss'

const Button = ({
  children,
  loading = false,
  onClick,
  color = 'default'
}: {
  children: React.ReactNode
  loading?: boolean
  onClick?: () => void
  color?: string
}): React.JSX.Element => {
  return (
    <button
      className={cn(css.button, css[color], { [css.disabled]: loading })}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? 'Загрузка...' : children}
    </button>
  )
}

export default Button
