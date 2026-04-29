import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { literature } from '../data/literature'
import SearchBar from '../components/SearchBar'
import RichText from '../components/RichText'
import { GraduationCap, ArrowLeft } from 'lucide-react'

const categoryOrder = ['台灣本土文獻', '國外文獻']

const categoryMeta = {
  '台灣本土文獻': {
    id: 'cat-taiwan',
    color: 'bg-tag-orange text-white',
    borderColor: 'border-l-tag-orange',
    bgAccent: 'bg-tag-orange/5',
    borderAccent: 'border-tag-orange/15',
    textAccent: 'text-tag-orange',
    description: '台灣學者對兒少表意權的在地研究與觀察',
  },
  '國外文獻': {
    id: 'cat-international',
    color: 'bg-tag-blue text-white',
    borderColor: 'border-l-tag-blue',
    bgAccent: 'bg-tag-blue/5',
    borderAccent: 'border-tag-blue/15',
    textAccent: 'text-tag-blue',
    description: 'Hart、Lundy、Lansdown 等國際學者的經典兒少參與理論',
  },
}

// Group literature by category
const grouped = {}
categoryOrder.forEach((cat) => {
  grouped[cat] = literature.filter((l) => l.category === cat)
})

export default function LiteraturePage() {
  const [search, setSearch] = useState('')
  const location = useLocation()
  const hash = location.hash.slice(1)

  // Find active category by hash
  const activeCategory = hash
    ? categoryOrder.find((cat) => categoryMeta[cat]?.id === hash)
    : null

  function renderLitCard(lit, meta) {
    return (
      <div
        key={lit.id}
        id={lit.id}
        className={`bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 border-l-4 ${meta.borderColor} overflow-hidden`}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 leading-snug">
              {lit.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lit.author}（{lit.year}）
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {lit.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                #{tag}
              </span>
            ))}
          </div>

          {/* Content — always expanded */}
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">📖 核心論點</h4>
              <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
                <RichText text={lit.summary} />
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-lg mt-1">
                💡
              </div>
              <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-2xl rounded-tl-sm p-4 border border-primary-200/60 dark:border-slate-600 shadow-sm">
                <h4 className="text-xs font-bold text-primary-500 dark:text-primary-400 mb-1.5 tracking-wider">
                  實務小提醒
                </h4>
                <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
                  <RichText text={lit.practicalInsight} />
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // Search results
  const searchFiltered = search.trim()
    ? literature.filter(
        (lit) =>
          lit.title.toLowerCase().includes(search.toLowerCase()) ||
          lit.author.toLowerCase().includes(search.toLowerCase()) ||
          lit.summary.toLowerCase().includes(search.toLowerCase())
      )
    : null

  // ===== Single category detail view =====
  if (activeCategory) {
    const meta = categoryMeta[activeCategory]
    const items = grouped[activeCategory] || []

    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          to="/literature"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回學術文獻
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${meta.color}`}>
            {activeCategory}
          </span>
          <span className="text-sm text-gray-400 dark:text-gray-500">{items.length} 篇</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{meta.description}</p>

        <div className="space-y-6">
          {items.map((lit) => renderLitCard(lit, meta))}
        </div>
      </div>
    )
  }

  // ===== Index view =====
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">學術文獻摘要</h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        兒少參與理論的經典與重要文獻，含核心論點與實務啟示
      </p>

      <div className="mb-10">
        <SearchBar value={search} onChange={setSearch} placeholder="搜尋文獻標題、作者..." />
      </div>

      {searchFiltered ? (
        // Search results
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">找到 {searchFiltered.length} 筆結果</p>
          {searchFiltered.length > 0 ? (
            <div className="space-y-6">
              {searchFiltered.map((lit) => {
                const meta = categoryMeta[lit.category] || categoryMeta['國外文獻']
                return renderLitCard(lit, meta)
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>找不到符合條件的文獻</p>
            </div>
          )}
        </div>
      ) : (
        // Category index cards
        <div className="grid sm:grid-cols-2 gap-4">
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat]
            const items = grouped[cat] || []
            return (
              <Link
                key={cat}
                to={`/literature#${meta.id}`}
                className={`block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 border-l-4 ${meta.borderColor} p-8 hover:shadow-md transition-shadow`}
              >
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${meta.color} mb-3`}>
                  {cat}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{meta.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{items.length} 篇文獻</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
