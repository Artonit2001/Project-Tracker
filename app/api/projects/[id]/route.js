const { NextResponse } = require('next/server')
const { getServerSession } = require('next-auth')
const { authOptions } = require('@/lib/auth')
const prisma = require('@/lib/prisma')

function parseProjectBody(body) {
  return {
    name: body.name,
    description: body.description ?? null,
    status: body.status ?? 'not-started',
    priority: body.priority ?? 'medium',
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    techStack: body.techStack?.length ? JSON.stringify(body.techStack) : null,
    progress: typeof body.progress === 'number' ? body.progress : 0,
    links: body.links?.length ? JSON.stringify(body.links) : null,
    notes: body.notes ?? null,
  }
}

async function GET(request, context) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = context.params?.id
  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    priority: project.priority,
    dueDate: project.dueDate?.toISOString() ?? null,
    techStack: project.techStack ? JSON.parse(project.techStack) : [],
    progress: project.progress,
    links: project.links ? JSON.parse(project.links) : [],
    notes: project.notes,
    createdAt: project.createdAt.toISOString(),
  })
}

async function PATCH(request, context) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = context.params?.id
  const existing = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  try {
    const body = await request.json()
    const data = parseProjectBody(body)
    const project = await prisma.project.update({
      where: { id },
      data,
    })
    return NextResponse.json({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      dueDate: project.dueDate?.toISOString() ?? null,
      techStack: project.techStack ? JSON.parse(project.techStack) : [],
      progress: project.progress,
      links: project.links ? JSON.parse(project.links) : [],
      notes: project.notes,
      createdAt: project.createdAt.toISOString(),
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

async function DELETE(request, context) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = context.params?.id
  const existing = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

module.exports = { GET, PATCH, DELETE }
