import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rick and Morty',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className='p-6'>
        <Link href="/" className="bg-yellow-200 border border-gray-500 p-2  rounded-md">Home</Link>
        </nav>
        <main className="flex min-h-screen flex-col items-center justify-between p-2">
          <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex xs:w-[150%] lg:w-[80%] md:w-[80%]">
          <div className="text-center space-y-10 flex flex-col items-center w-full">
            {children}  
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
