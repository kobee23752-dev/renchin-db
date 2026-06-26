import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { laws } from '../data/laws'
import { literature } from '../data/literature'
import { tools } from '../data/tools'
import { crcTimeline, youthStories } from '../data/crcReview'
import { empowermentPrograms } from '../data/empowerment'
import { Search, X } from 'lucide-react'

function searchAll(query) {
  if (!query) return []
  const q = query.toLowerCase()
  const results = []

  laws.forEach((item) => {
    if (
      item.title.toLowerCase().includes(q) ||
      item.plainText.toLowerCase().includes(q) ||
      item.practicalMeaning.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ ...item, type: '法規與公約', link: '/laws' })
    }
  })

  literature.forEach((item) => {
    if (
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ ...item, type: '學術文獻', link: '/literature' })
    }
  })

  tools.forEach((item) => {
    if (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ ...item, type: '實務工具', link: '/tools' })
    }
  })

  crcTimeline.forEach((item) => {
    if (
      item.round.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ ...item, title: item.round, type: 'CRC 審查', link: '/crc-review' })
    }
  })

  youthStories.forEach((item) => {
    if (
      item.title.toLowerCase().includes(q) ||
      (item.content && item.content.toLowerCase().includes(q)) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ ...item, type: '兒少故事', link: '/crc-review' })
    }
  });

  [...empowermentPrograms.domestic, ...empowermentPrograms.international].forEach((item) => {
    if (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ ...item, type: '培力方案', link: item.featured ? '/empowerment#domestic' : '/empowerment' })
    }
  })

  return results
}

const typeBadgeColors = {
  '法規與公約': 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300',
  '學術文獻': 'bg-accent-50 text-accent-600 dark:bg-accent-100/10 dark:text-accent-400',
  '實務工具': 'bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-300',
  'CRC 審查': 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  '兒少故事': 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300',
  '培力方案': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

const TYPE_ORDER = ['法規與公約', '學術文獻', '實務工具', 'CRC 審查', '兒少故事', '培力方案']

// 把符合查詢的片段標亮
function highlight(text, query) {
  if (!text || !query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent-200/70 dark:bg-accent-400/30 text-inherit rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

// 從內文中抓出含關鍵字的一段，讓使用者看到命中位置
function snippetAround(text, query, radius = 60) {
  if (!text) return ''
  if (!query) return text.slice(0, radius * 2)
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text.slice(0, radius * 2)
  const start = Math.max(0, idx - radius)
  const end = Math.min(text.length, idx + query.length + radius)
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [draft, setDraft] = useState(query)
  const [activeType, setActiveType] = useState('全部')

  const results = useMemo(() => searchAll(query), [query])

  // 各類型筆數
  const counts = useMemo(() => {
    const c = {}
    results.forEach((r) => { c[r.type] = (c[r.type] || 0) + 1 })
    return c
  }, [results])

  const visible = activeType === '全部'
    ? results
    : results.filter((r) => r.type === activeType)

  const availableTypes = TYPE_ORDER.filter((t) => counts[t])

  function submitSearch(e) {
    e.preventDefault()
    const q = draft.trim()
    setActiveType('全部')
    setSearchParams(q ? { q } : {})
  }

  function searchTag(tag) {
    setDraft(tag)
    setActiveType('全部')
    setSearchParams({ q: tag })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">搜尋</h1>
      </div>

      {/* 搜尋框 */}
      <form onSubmit={submitSearch} className="mb-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="搜尋法規、文獻、工具、教材、培力方案…"
            className="w-full pl-12 pr-24 py-3 rounded-xl border border-primary-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {draft && (
            <button
              type="button"
              onClick={() => setDraft('')}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="清除"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            搜尋
          </button>
        </div>
      </form>

      {query && (
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          搜尋「<span className="font-medium text-gray-700 dark:text-gray-200">{query}</span>」找到 {results.length} 筆資料
        </p>
      )}

      {/* 類型篩選 */}
      {results.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveType('全部')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeType === '全部'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            全部 {results.length}
          </button>
          {availableTypes.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeType === t
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {t} {counts[t]}
            </button>
          ))}
        </div>
      )}

      {!query ? (
        <div className="text-center py-16 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">輸入關鍵字開始搜尋</p>
          <p className="text-sm mt-1">例如：表意權、Lundy、兒少代表、傾聽</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">找不到相關資料</p>
          <p className="text-sm mt-1">試試其他關鍵字</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              to={item.link}
              className="block bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${typeBadgeColors[item.type] || 'bg-gray-100 text-gray-600'}`}>
                    {item.type}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">{highlight(item.title, query)}</h3>
                  {item.author && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.author}（{item.year}）
                    </p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {highlight(
                      snippetAround(
                        item.plainText || item.summary || item.description || item.content || '',
                        query
                      ),
                      query
                    )}
                  </p>
                </div>
              </div>
              {item.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => { e.preventDefault(); searchTag(tag) }}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
