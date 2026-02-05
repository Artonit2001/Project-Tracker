import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#faf8f5]">
      <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-2 tracking-tight text-center">
        Developer Project Tracker
      </h1>
      <p className="text-[#57534e] mb-10 text-center max-w-md">
        Track your projects, tech stack, and progress. Sign in or create an account to get started.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-[#c2410c] text-white rounded-lg font-medium hover:bg-[#9a3412] transition-colors text-center"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 border border-[#e7e5e4] rounded-lg font-medium hover:bg-white transition-colors text-center"
        >
          Register
        </Link>
      </div>
    </div>
  )
}
