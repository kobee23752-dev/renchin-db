import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tools } from '../data/tools'
import SearchBar from '../components/SearchBar'
import { Wrench, CheckSquare, ArrowLeft } from 'lucide-react'

const typeColors = {
  SOP: 'bg-tag-blue text-white',
  '訪談工具': 'bg-tag-orange text-white',
  '評估工具': 'bg-tag-teal text-white',
  '案例分析': 'bg-tag-red text-white',
}
const getTypeColor = (type) => typeColors[type] || 'bg-tag-green text-white'

function ToolContent({ tool }) {
  if (tool.content) {
    if (tool.content[0]?.step) {
      return (
        <div className="space-y-3">
          {tool.content.map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 flex items-center justify-center font-bold text-sm">
                {s.step}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{s.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )
    }
    if (tool.content[0]?.section) {
      return (
        <div className="space-y-4">
          {tool.content.map((s) => (
            <div key={s.section}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{s.section}</h4>
              <ul className="space-y-1">
                {s.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
                    <span className="text-primary-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    }
  }

  if (tool.checklist) {
    return (
      <div className="space-y-6">
        {tool.checklist.map((dim) => (
          <div key={dim.dimension} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{dim.dimension}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{dim.description}</p>
            <div className="space-y-2">
              {dim.items.map((item, i) => (
                <label key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <CheckSquare className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tool.comparison) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">面向</th>
              <th className="text-left py-2 px-3 font-semibold text-primary-600 dark:text-primary-400">城市（北投）</th>
              <th className="text-left py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">偏鄉（鳳林）</th>
            </tr>
          </thead>
          <tbody>
            {tool.comparison.map((row) => (
              <tr key={row.aspect} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">{row.aspect}</td>
                <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{row.urban}</td>
                <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{row.rural}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return null
}

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const location = useLocation()
  const hash = location.hash.slice(1)

  // If hash matches a tool id, show only that tool
  const activeTool = hash ? tools.find((t) => t.id === hash) : null

  const filtered = tools.filter((tool) => {
    return (
      !search ||
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  // ===== Single tool detail view =====
  if (activeTool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回實務工具
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${getTypeColor(activeTool.type)} mb-2`}>
                  {activeTool.type}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{activeTool.title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activeTool.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {activeTool.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>

            <ToolContent tool={activeTool} />
          </div>
        </div>
      </div>
    )
  }

  // ===== Index view =====
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Wrench className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">實務工具與案例</h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        班會 SOP、訪談工具、評估檢核表、城鄉案例比較
      </p>

      <div className="mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="搜尋工具..." />
      </div>

      {!search ? (
        // Index cards
        <div className="space-y-4">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools#${tool.id}`}
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${getTypeColor(tool.type)} mb-2`}>
                    {tool.type}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tool.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Search results — show full content
        <div className="space-y-6">
          {filtered.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools#${tool.id}`}
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
            >
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${getTypeColor(tool.type)} mb-2`}>
                {tool.type}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tool.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Wrench className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>找不到符合條件的工具</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
