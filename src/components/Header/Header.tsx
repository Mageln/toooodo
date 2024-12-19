import Link from 'next/link'
import React from 'react'
import css from './index.module.scss'

const Header = () => {
  return (
    <div className={css.header}>
      <Link href="/">
        <h1>TODOлист</h1>
      </Link>
    </div>
  )
}

export default Header
