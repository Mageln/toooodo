'use client'
import Link from 'next/link'
import React from 'react'
import css from './index.module.scss'
import { useTitle } from '@/context/TitleContext'

const Header: React.FC = (): React.JSX.Element => {
  const { title } = useTitle()

  return (
    <div className={css.header}>
      <Link href="/">
        <h1>TODOлист</h1>
      </Link>
      <h3>{title}</h3>
    </div>
  )
}

export default Header
