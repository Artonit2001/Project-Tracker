'use client'

import { motion } from 'framer-motion'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const statusColors = {
  'not-started': 'bg-gray-100 text-[#78716c]',
  'in-progress': 'bg-yellow-100 text-[#854d0e]',
  completed: 'bg-green-100 text-[#15803d]',
}

const priorityColors = {
  low: 'bg-green-100 text-[#3f6212]',
  medium: 'bg-teal-100 text-[#0f766e]',
  high: 'bg-red-100 text-[#dc2626]',
}

const statusLabels = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export default function ProjectCard({ project, onEdit, onDelete }) {
  const progress = project.progress || 0
  const daysUntilDue = project.dueDate
    ? Math.ceil((new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="bg-white border border-[#e7e5e4] rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight flex-1">
          {project.name || 'Untitled Project'}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[project.status] || statusColors['not-started']}`}
        >
          {statusLabels[project.status] || 'Not started'}
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority] || priorityColors.medium}`}
        >
          {priorityLabels[project.priority] || 'Medium'}
        </span>
        {project.dueDate && (
          <span className="text-xs text-[#57534e]">
            Due {formatDate(project.dueDate)}
            {daysUntilDue !== null && daysUntilDue < 7 && daysUntilDue >= 0 && (
              <span className="ml-1 text-red-600 font-medium">
                ({daysUntilDue === 0 ? 'Today' : `${daysUntilDue}d left`})
              </span>
            )}
          </span>
        )}
      </div>

      {project.description && (
        <p className="text-sm text-[#57534e] mb-3 leading-relaxed">{project.description}</p>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {(project.status === 'in-progress' || progress > 0) && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-[#57534e] mb-1.5">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-[#c2410c] rounded-full"
            />
          </div>
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#c2410c] hover:underline"
            >
              {link.label || link.url}
            </a>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-4 border-t border-[#e7e5e4]">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-sm text-[#57534e] hover:bg-gray-100 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-sm text-[#57534e] hover:bg-gray-100 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </motion.div>
  )
}
