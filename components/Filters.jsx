'use client'

import { motion } from 'framer-motion'

export default function Filters({
  statusFilter,
  techFilter,
  sortBy,
  allTechStack,
  onStatusChange,
  onTechChange,
  onSortChange,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6"
    >
      <div className="flex items-center gap-2">
        <label htmlFor="filter-status" className="text-sm font-medium text-[#57534e]">
          Status
        </label>
        <select
          id="filter-status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-1.5 border border-[#e7e5e4] rounded-lg bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
        >
          <option value="">All</option>
          <option value="not-started">Not started</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="filter-tech" className="text-sm font-medium text-[#57534e]">
          Tech
        </label>
        <select
          id="filter-tech"
          value={techFilter}
          onChange={(e) => onTechChange(e.target.value)}
          className="px-3 py-1.5 border border-[#e7e5e4] rounded-lg bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
        >
          <option value="">All</option>
          {allTechStack.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-by" className="text-sm font-medium text-[#57534e]">
          Sort
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-1.5 border border-[#e7e5e4] rounded-lg bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c2410c] focus:ring-offset-1"
        >
          <option value="date-desc">Due date (newest)</option>
          <option value="date-asc">Due date (oldest)</option>
          <option value="name">Name A–Z</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </motion.section>
  )
}
