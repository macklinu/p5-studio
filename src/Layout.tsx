import * as React from 'react'
import { Frame } from './Frame'

interface LayoutProps {
  children: React.ReactNode
  withFrame?: boolean
}

export function Layout({ children, withFrame = false }: LayoutProps) {
  const content = withFrame ? <Frame>{children}</Frame> : children

  return (
    <main className='font-mono p-4 bg-white container flex flex-row'>
      {content}
    </main>
  )
}
