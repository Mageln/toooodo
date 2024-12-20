'use client'

import { Provider } from 'react-redux'
import store from '@/redux/store'
import React from 'react'
import { TitleProvider } from '@/context/TitleContext'

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <Provider store={store}>
    <TitleProvider>
    {children}
    </TitleProvider>
    </Provider>
}

export default ClientProvider
