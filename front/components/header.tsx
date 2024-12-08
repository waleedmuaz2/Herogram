"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, PlusSquare, User, LogIn, LogOut, TvIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem("authToken")
      setIsAuthenticated(!!authToken)
    }

    checkAuthStatus()

    // Add an event listener to update auth status on login
    window.addEventListener('storage', checkAuthStatus)

    return () => {
      window.removeEventListener('storage', checkAuthStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img src="https://static.wixstatic.com/media/14322a_5e5a7fdd4d584d5083e00449c25cb990~mv2.png/v1/fill/w_210,h_210,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/herogram_mark_1080.png" alt="Herogram" width={50} height={50} />
          <Link href="/" className="text-xl font-bold hidden sm:block">Herogram</Link>
          <Link href="/" className="text-xl font-bold sm:hidden">HG</Link>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href="/" className="text-gray-700 hover:text-black">
                        <Home className="h-6 w-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      Home
                    </TooltipContent>
                  </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/my-posts" className="text-gray-700 hover:text-black">
                      <TvIcon className="h-6 w-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    My Posts
                  </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                <button onClick={handleLogout} className="text-gray-700 hover:text-black">
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-black"><LogIn className="h-6 w-6" /></Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

