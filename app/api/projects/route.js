const { NextResponse } = require('next/server')
const { getServerSession } = require('next-auth')
const { authOptions } = require('@/lib/auth')
const prisma = require('@/lib/prisma')

function parseProjectBody(body) {
  return {
    name: body.name || 'Untitled',
    description: body.description || null,
    status: body.status || 'not-started',
    priority: body.priority || 'medium',
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    techStack: body.techStack ? JSON.stringify(body.techStack) : null,
    progress: typeof body.progress === 'number' ? body.progress : 0,
    links: body.links?.length ? JSON.stringify(body.links) : null,
    notes: body.notes || null,
  }
}

async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const list = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })
  const projects = list.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    status: p.status,
    priority: p.priority,
    dueDate: p.dueDate?.toISOString() ?? null,
    techStack: p.techStack ? JSON.parse(p.techStack) : [],
    progress: p.progress,
    links: p.links ? JSON.parse(p.links) : [],
    notes: p.notes,
    createdAt: p.createdAt.toISOString(),
  }))
  return NextResponse.json(projects)
}

async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const data = parseProjectBody(body)
    const project = await prisma.project.create({
      data: { ...data, userId: session.user.id },
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
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

module.exports = { GET, POST }
