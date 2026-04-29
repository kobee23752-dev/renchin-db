import { Link } from 'react-router-dom'

export default function RoleCard({ icon, title, description, links, color }) {
  const colorClasses = {
    orange: 'from-accent-400 to-accent-600 border-accent-500',
    blue: 'from-primary-400 to-primary-700 border-primary-600',
    green: 'from-emerald-400 to-emerald-600 border-emerald-500',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 hover:shadow-md transition-shadow overflow-hidden">
      <div className={`bg-gradient-to-br ${colorClasses[color]} p-6 text-white`}>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-white/90 text-sm mt-1">{description}</p>
      </div>
      <div className="p-4 space-y-2">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="block px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors"
          >
            → {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
