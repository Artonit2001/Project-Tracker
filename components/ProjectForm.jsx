'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const statusOptions = [
  { value: 'not-started', label: 'Not started' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const commonTechStack = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'GraphQL',
  'Prisma',
  'Vite',
  'Framer Motion',
  'Express',
  'Docker',
]

export default function ProjectForm({ project, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'not-started',
    priority: 'medium',
    dueDate: '',
    techStack: [],
    progress: 0,
    links: [{ label: '', url: '' }],
    notes: '',
  })

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'not-started',
        priority: project.priority || 'medium',
        dueDate: project.dueDate ? project.dueDate.split('T')[0] : '',
        techStack: project.techStack || [],
        progress: project.progress || 0,
        links:
          project.links && project.links.length > 0 ? project.links : [{ label: '', url: '' }],
        notes: project.notes || '',
      })
    }
  }, [project])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTechToggle = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }))
  }

  const handleAddTech = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault()
      const tech = e.target.value.trim()
      if (!formData.techStack.includes(tech)) {
        setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, tech] }))
      }
      e.target.value = ''
    }
  }

  const handleLinkChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }))
  }

  const handleAddLink = () => {
    setFormData((prev) => ({ ...prev, links: [...prev.links, { label: '', url: '' }] }))
  }

  const handleRemoveLink = (index) => {
    setFormData((prev) => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      dueDate: formData.dueDate || null,
      links: formData.links.filter((link) => link.url?.trim()),
      techStack: formData.techStack.filter(Boolean),
    }
    onSubmit(submitData)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.form
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="font-serif text-2xl font-normal mb-6">
            {project ? 'Edit Project' : 'New Project'}
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. E-commerce Platform"
                className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                placeholder="Brief description of the project..."
                className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1 resize-y"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
                >
                  {priorityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
                />
              </div>
              {(formData.status === 'in-progress' || formData.status === 'completed') && (
                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-1.5">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Tech Stack</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonTechStack.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechToggle(tech)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      formData.techStack.includes(tech)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-[#e7e5e4] text-[#57534e] hover:bg-gray-50'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type and press Enter to add custom tech..."
                onKeyDown={handleAddTech}
                className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1 text-sm"
              />
              {formData.techStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Links</label>
              {formData.links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Label (e.g. GitHub, Live Demo)"
                    value={link.label}
                    onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1 text-sm"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    className="flex-2 px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1 text-sm"
                  />
                  {formData.links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLink}
                className="text-sm text-[#c2410c] hover:underline"
              >
                + Add link
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                placeholder="Additional notes, todos, or reminders..."
                className="w-full px-3 py-2 border border-[#e7e5e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1 resize-y"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-[#e7e5e4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#57534e] hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#c2410c] text-white rounded-lg hover:bg-[#9a3412] transition-colors"
            >
              {project ? 'Update' : 'Create'}
            </button>
          </div>
        </motion.form>
      </div>
    </AnimatePresence>
  )
}
