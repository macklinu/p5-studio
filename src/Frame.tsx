import * as React from 'react'

interface FrameProps {
  children: React.ReactNode
}

export function Frame({ children }: FrameProps) {
  return (
    <div className='frame-border'>
      <div className='frame-inset'>{children}</div>
    </div>
  )
}
