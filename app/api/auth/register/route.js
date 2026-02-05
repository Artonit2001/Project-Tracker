const { NextResponse } = require('next/server')
const bcrypt = require('bcryptjs')
const prisma = require('@/lib/prisma')

async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, name } = body
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name || null },
      select: { id: true, email: true, name: true },
    })
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}

module.exports = { POST }
