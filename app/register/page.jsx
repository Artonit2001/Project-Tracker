'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: name || undefined }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(data.error || 'Registration failed')
      return
    }
    router.push('/login?registered=1')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#faf8f5]">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-2xl font-normal mb-6 text-center">Create account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#57534e] mb-1">
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#57534e] mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#57534e] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-[#c2410c] text-white rounded-lg font-medium hover:bg-[#9a3412] transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#57534e]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#c2410c] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
