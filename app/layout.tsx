import './globals.css'
import { Inter } from 'next/font/google'

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
    <html lang="en" className='!scroll-smooth'>
      <body className={inter.className}>
        <Header />
        {children}
        </body>
    </html>
  )
}
