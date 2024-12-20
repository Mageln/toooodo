import type { Metadata } from 'next'
import './globals.css'
import ClientProvider from '@/components/ClientProvider/ClientProvider'
import Header from '@/components/Header/Header'

export const metadata: Metadata = {
  title: 'TodoList',
  description: 'Test TODOLISt'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClientProvider>
        <body>
          <Header />
          {children}
        </body>
      </ClientProvider>
    </html>
  )
}
