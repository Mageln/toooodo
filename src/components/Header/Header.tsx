'use client'
import Link from 'next/link'
import React from 'react'
import css from './index.module.scss'
import { useTitle } from '@/context/TitleContext'
import Button from '../Button/Button'
import { Plus } from 'lucide-react'

const Header: React.FC = (): React.JSX.Element => {
  const { title } = useTitle()

  return (
    <div className={css.header}>
      <Link href="/">
        <h1 className={css.mainTitle}>TODOлист</h1>
      </Link>
      <h3 className={css.subTitle}>{title}</h3>
      <Link className={css.addTask} href="/add-task">
              <Button><Plus/></Button>
            </Link>
    </div>
  )
}

export default Header
