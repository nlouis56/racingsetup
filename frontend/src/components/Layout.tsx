// src/components/Layout.tsx
import Link from 'next/link'
import { ReactNode } from 'react'
import { FaBars } from 'react-icons/fa'
import 'tailwindcss/tailwind.css'

type LayoutProps = {
  children: ReactNode
  onToggleSidebar?: () => void
  showHeader?: boolean
  customHeader?: ReactNode
}

export default function Layout({
  children,
  onToggleSidebar,
  showHeader = true,
  customHeader,
}: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      {showHeader && (
        <header className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow-md">
          {customHeader || (
            <>
              <h1 className="text-lg font-bold">Racing Setup</h1>
              {onToggleSidebar && (
                <button
                  className="md:hidden p-2 bg-blue-600 rounded"
                  onClick={onToggleSidebar}
                >
                  <FaBars size={20} />
                </button>
              )}
              <nav className="hidden md:flex space-x-4">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </nav>
            </>
          )}
        </header>
      )}

      {/* Contenu principal */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600">
        © 2024 Racing Setup
      </footer>
    </div>
  )
}
