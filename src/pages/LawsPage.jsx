import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { laws } from '../data/laws'
import SearchBar from '../components/SearchBar'
import RichText from '../components/RichText'
import { Scale, ArrowLeft, ChevronDown, ChevronUp, Bookmark } from 'lucide-react'

const categoryColors = {
  '國際公約': 'bg-tag-teal text-white',
  '國內法規': 'bg-tag-blue text-white',
}
const borderColors = {
  '國際公約': 'border-l-tag-teal',
  '國內法規': 'border-l-tag-blue',
}

function LawCard({ law }) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 overflow-hidden border-l-4 ${borderColors[law.category] || 'border-l-primary-500'}`}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[law.category] || 'bg-primary-600 text-white'} mb-3`}>
              {law.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
              {law.title}
            </h2>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 mb-4">
          <p className="text-[15px] text-gray-600 dark:text-gray-300 whitespace-pre-line leading-[1.85]">
            {law.originalText}
          </p>
        </div>

        <div className="bg-primary-50/80 dark:bg-primary-900/15 rounded-xl p-5 mb-4">
          <h3 className="text-sm font-bold text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-1.5">
            💬 白話翻譯
          </h3>
          <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
            <RichText text={law.plainText} />
          </p>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-lg mt-1">
            💡
          </div>
          <div className="relative flex-1 bg-white dark:bg-slate-700/50 rounded-2xl rounded-tl-sm p-4 border border-primary-200/60 dark:border-slate-600 shadow-sm">
            <h3 className="text-sm font-bold text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-1.5">
              💡 實務小提醒
            </h3>
            <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
              <RichText text={law.practicalMeaning} />
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {law.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function LawDetail({ law }) {
  const [expanded, setExpanded] = useState(false)
  const hasFullText = law.fullArticles && law.fullArticles.length > 0

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/laws"
        className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回法規與公約
      </Link>

      {/* 標題 */}
      <div className="mb-8">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[law.category] || 'bg-primary-600 text-white'} mb-3`}>
          {law.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
          {law.title}
        </h1>
      </div>

      {/* 重點摘要 */}
      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
          <p className="text-[15px] text-gray-600 dark:text-gray-300 whitespace-pre-line leading-[1.85]">
            {law.originalText}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-primary-50/80 dark:bg-primary-900/15 rounded-xl p-5">
            <h3 className="text-sm font-bold text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-1.5">
              💬 白話翻譯
            </h3>
            <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
              <RichText text={law.plainText} />
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700/50 rounded-xl p-5 border border-primary-200/60 dark:border-slate-600 shadow-sm">
            <h3 className="text-sm font-bold text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-1.5">
              💡 實務小提醒
            </h3>
            <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
              <RichText text={law.practicalMeaning} />
            </p>
          </div>
        </div>
      </div>

      {/* 完整法條 */}
      {hasFullText && (
        <div className="mt-10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border border-primary-200 dark:border-slate-700 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary-500" />
              <span className="font-bold text-gray-900 dark:text-white">
                {law.fullLawName || law.title} — 完整條文
              </span>
              <span className="text-xs text-gray-400 ml-1">
                共 {law.fullArticles.length} 條
              </span>
            </div>
            {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {expanded && (
            <div className="mt-4 space-y-2">
              {law.fullArticles.map((article) => (
                <div
                  key={article.number}
                  className={`rounded-lg p-4 transition-colors ${
                    article.highlight
                      ? 'bg-tag-orange/8 dark:bg-tag-orange/10 border-l-4 border-tag-orange'
                      : 'bg-white dark:bg-slate-800 border border-primary-100 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-sm font-bold whitespace-nowrap ${
                      article.highlight ? 'text-tag-orange' : 'text-primary-600 dark:text-primary-400'
                    }`}>
                      {article.highlight && <Bookmark className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />}
                      {article.number}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1.5 whitespace-pre-line">
                    <RichText text={article.text} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 標籤 */}
      <div className="flex flex-wrap gap-1.5 mt-8">
        {law.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function LawsPage() {
  const [search, setSearch] = useState('')
  const location = useLocation()
  const hash = location.hash.slice(1) // remove #

  // If hash matches a law id, show only that law
  const activeLaw = hash ? laws.find((l) => l.id === hash) : null

  const filtered = laws.filter((law) => {
    return (
      !search ||
      law.title.toLowerCase().includes(search.toLowerCase()) ||
      law.plainText.toLowerCase().includes(search.toLowerCase()) ||
      law.practicalMeaning.toLowerCase().includes(search.toLowerCase())
    )
  })

  // Single law detail view
  if (activeLaw) {
    return <LawDetail law={activeLaw} />
  }

  // Index view
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Scale className="w-8 h-8 text-tag-blue" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">法規與公約專區</h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        CRC 公約條文、國內相關法規，每則附上白話翻譯與實務意義
      </p>

      <div className="mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="搜尋法規內容..." />
      </div>

      {!search ? (
        // Index cards
        <div className="space-y-4">
          {laws.map((law) => (
            <Link
              key={law.id}
              to={`/laws#${law.id}`}
              className={`block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 border-l-4 ${borderColors[law.category] || 'border-l-primary-500'} p-6 hover:shadow-md transition-shadow`}
            >
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[law.category] || 'bg-primary-600 text-white'} mb-2`}>
                {law.category}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{law.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {law.plainText.replace(/\*\*/g, '').replace(/\{\{/g, '').replace(/\}\}/g, '')}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {law.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Search results
        <div className="space-y-8">
          {filtered.map((law) => (
            <LawCard key={law.id} law={law} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Scale className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>找不到符合條件的法規</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
