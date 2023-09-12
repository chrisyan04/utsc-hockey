import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UTSC Hockey',
  description: 'University of Toronto Scarborough Intramural Hockey Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='!scroll-smooth bg-gray-300/50'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  )
}
