import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full p-4 border-t bg-slate-100'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-center'>
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <h1>Made with ❤️ by Alexander Perez</h1>
        </div>
      </div>
    </div>
  )
}