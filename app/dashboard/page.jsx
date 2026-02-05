'use client'

import { useState, useMemo } from 'react'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjects } from '@/hooks/useProjects'
import ProjectCard from '@/components/ProjectCard'
import ProjectForm from '@/components/ProjectForm'
import Filters from '@/components/Filters'

export default function DashboardPage() {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [techFilter, setTechFilter] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')

  const filteredAndSorted = useMemo(() => {
    let filtered = [...projects]
    if (statusFilter) filtered = filtered.filter((p) => p.status === statusFilter)
    if (techFilter) {
      filtered = filtered.filter((p) =>
        p.techStack?.some((tech) =>
          String(tech).toLowerCase().includes(techFilter.toLowerCase())
        )
      )
    }
    if (sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.dueDate || 0) - new Date(a.dueDate || 0))
    } else if (sortBy === 'date-asc') {
      filtered.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0))
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      filtered.sort((a, b) => (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1))
    }
    return filtered
  }, [projects, statusFilter, techFilter, sortBy])

  const allTechStack = useMemo(() => {
    const techSet = new Set()
    projects.forEach((p) => p.techStack?.forEach((tech) => techSet.add(tech)))
    return Array.from(techSet).sort()
  }, [projects])

  const handleOpenForm = (project = null) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  const handleSubmit = async (projectData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData)
      } else {
        await addProject(projectData)
      }
      handleCloseForm()
    } catch {}
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <p className="text-[#57534e]">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-2 tracking-tight">
              Developer Project Tracker
            </h1>
            <p className="text-[#57534e] mb-6">Track your projects, tech stack, and progress</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenForm()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c2410c] text-white rounded-lg font-medium hover:bg-[#9a3412] transition-colors"
            >
              <span className="text-xl">+</span>
              New Project
            </motion.button>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 text-sm text-[#57534e] hover:bg-white border border-[#e7e5e4] rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        <Filters
          statusFilter={statusFilter}
          techFilter={techFilter}
          sortBy={sortBy}
          allTechStack={allTechStack}
          onStatusChange={setStatusFilter}
          onTechChange={setTechFilter}
          onSortChange={setSortBy}
        />

        <main className="mt-6">
          {filteredAndSorted.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-[#57534e]"
            >
              <p className="font-medium text-[#1c1917] mb-1">
                {projects.length === 0 ? 'No projects yet.' : 'No projects match the filters.'}
              </p>
              <p>Add one to get started.</p>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:gap-5">
              <AnimatePresence mode="popLayout">
                {filteredAndSorted.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={() => handleOpenForm(project)}
                    onDelete={() => {
                      if (confirm('Delete this project?')) {
                        deleteProject(project.id)
                      }
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleSubmit}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
