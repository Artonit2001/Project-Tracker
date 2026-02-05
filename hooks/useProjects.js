'use client'

import { useState, useEffect, useCallback } from 'react'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = useCallback(async () => {
    const res = await fetch('/api/projects')
    if (!res.ok) {
      setProjects([])
      setLoading(false)
      return
    }
    const data = await res.json()
    setProjects(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const addProject = useCallback(async (project) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    })
    if (!res.ok) throw new Error('Failed to create project')
    const created = await res.json()
    setProjects((prev) => [created, ...prev])
    return created.id
  }, [])

  const updateProject = useCallback(async (id, updates) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (!res.ok) throw new Error('Failed to update project')
    const updated = await res.json()
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }, [])

  const deleteProject = useCallback(async (id) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete project')
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { projects, loading, addProject, updateProject, deleteProject, refetch: fetchProjects }
}
