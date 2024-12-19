import React from 'react'
import css from './index.module.scss'

const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.formItem}>{children}</div>
}

export default FormItem
