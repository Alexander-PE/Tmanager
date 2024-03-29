import Link from 'next/link'
import localFont from 'next/font/local'
import { Onest } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import { cn } from '@/lib/utils'

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
})

const bodyFont = Onest({
  subsets: ['latin'],
  weight: ['400', '700'],
})


const MarketingPage = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className={cn('flex items-center justify-center flex-col pt-10', headingFont.className)}>
        {/* <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
          <Medal className='h-6 w-6 mr-2' />
          No.1 task management service
        </div> */}
        <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
          T-Manager helps team move
        </h1>
        <div className='text-3xl md:text-6xl bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 p-2 rounded-md pt-4 w-fit'>
          Work forward
        </div>
      </div>
      <div className={cn('text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto', bodyFont.className)}>
        Collaborate, manage project, and reach new productivity peaks. From high rises to the home office, the way your team works is unique — accomplish it all with T-Manager.
      </div>
      <Button className='mt-8' size='lg' asChild>
        <Link href='/sign-up'>
          Get for free
        </Link>
      </Button>
    </div>
  )
}

export default MarketingPage
