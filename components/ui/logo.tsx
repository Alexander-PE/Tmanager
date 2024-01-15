import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import Link from 'next/link'
import React from 'react'

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
})

const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 4a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2M9.354 3c.705-.622 1.632-1 2.646-1s1.94.378 2.646 1H18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.126 5H6v15h12V5h-2.126c.082.32.126.655.126 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6c0-.345.044-.68.126-1M8 11a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1"/></g></svg>
        <p className={cn("text-md text-neutral-700", headingFont.className)}>
          T-Manager
        </p>
      </div>
    </Link>
  )
}

export default Logo
