import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
      <div>
        <Link href="/" className="text-xl font-bold">
          Racing Setup
        </Link>
      </div>
      <div className="space-x-4">
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <Link href="/register" className="hover:underline">
          Register
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </div>
    </nav>
  )
}
