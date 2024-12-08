import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './styles/custom-scrollbar.css'
import { Header } from '@/components/header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Herogram',
  description: 'A simple social media platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

