// src/pages/register.tsx
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { backendUrl } from '@/data/callServer'
import router from 'next/router'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    racingNumber: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const bodyData = { displayName: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      racingNumber: formData.racingNumber
    };

    const response = await fetch(`http://${backendUrl}/api/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/dashboard');
    } else {
      console.error('Failed to register user:', data);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Register</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
              <div>
              <label
                htmlFor="racingNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Racing Number
              </label>
              <input
                type="text"
                id="racingNumber"
                name="racingNumber"
                value={formData.racingNumber}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                required
              />
            </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}
