import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { empowermentPrograms } from '../data/empowerment'
import SearchBar from '../components/SearchBar'
import { Users, ChevronDown, ChevronUp, ArrowLeft, Download } from 'lucide-react'

const featuredCurriculum = empowermentPrograms.domestic.find((p) => p.featured)

const tabMeta = [
  { id: 'domestic', label: '🇹🇼 國內方案', color: 'bg-tag-red text-white' },
  { id: 'international', label: '🌍 國際方案', color: 'bg-tag-blue text-white' },
]

export default function EmpowermentPage() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState({})
  const location = useLocation()
  const hash = location.hash.slice(1)

  const [activeTab, setActiveTab] = useState(hash || '')

  useEffect(() => {
    if (hash && tabMeta.some((t) => t.id === hash)) {
      setActiveTab(hash)
    }
  }, [hash])

  const isOriginal = hash === 'original'
  const isDeepLink = hash && tabMeta.some((t) => t.id === hash)

  const programs = activeTab === 'domestic'
    ? empowermentPrograms.domestic
    : activeTab === 'international'
      ? empowermentPrograms.international
      : []

  const filtered = programs.filter((p) => {
    return (
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  // ===== 研究者原創教案 — 專屬頁 =====
  if (isOriginal && featuredCurriculum) {
    const c = featuredCurriculum
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          to="/empowerment"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回培力方案
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-tag-purple text-white">
            本站原創教案
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{c.title}</h1>
        <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{c.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {c.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              #{tag}
            </span>
          ))}
        </div>

        <a
          href={c.downloadUrl}
          download={c.downloadName}
          className="inline-flex items-center gap-2 px-5 py-3 mb-8 bg-tag-purple hover:opacity-90 text-white rounded-xl text-base font-semibold transition-colors shadow-sm"
        >
          <Download className="w-5 h-5" />
          下載完整 Word 教案
        </a>

        {/* 六堂課架構 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📋 六堂課架構</h2>
        <div className="space-y-3 mb-8">
          {c.structure.map((s) => (
            <div
              key={s.unit}
              className="flex gap-4 items-start bg-white dark:bg-slate-800 rounded-xl border border-primary-200 dark:border-slate-700 p-4"
            >
              <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold bg-tag-purple/15 text-tag-purple dark:bg-tag-purple/25 dark:text-tag-purple">
                {s.unit}
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 教案特色 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 教案特色</h2>
        <div className="bg-primary-100/50 dark:bg-primary-900/10 rounded-xl p-5 mb-8">
          <ul className="space-y-2">
            {c.keyPoints.map((point, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                <span className="text-tag-purple flex-shrink-0">✓</span>{point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-primary-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            本教案歡迎陪讀班、課輔班、學校與社區團體免費取用、改編施作。引用時請註明來源：
            <span className="text-gray-700 dark:text-gray-200 font-medium">中華仁親社區關懷協會</span>。
          </p>
        </div>
      </div>
    )
  }

  // Index view
  if (!isDeepLink) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">兒少培力方案</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          國內外兒少代表培力方案與實證模型
        </p>

        {featuredCurriculum && (
          <div className="mb-8 rounded-2xl border-2 border-tag-purple/40 dark:border-tag-purple/40 bg-gradient-to-br from-tag-purple/10 to-primary-50 dark:from-slate-800 dark:to-slate-800/50 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-tag-purple text-white">
                本站原創教案
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {featuredCurriculum.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {featuredCurriculum.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={featuredCurriculum.downloadUrl}
                download={featuredCurriculum.downloadName}
                className="inline-flex items-center gap-2 px-4 py-2 bg-tag-purple hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                下載 Word 教案
              </a>
              <Link
                to="/empowerment#original"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-primary-700 dark:text-gray-200 border border-primary-200 dark:border-slate-600 rounded-xl text-sm font-semibold hover:shadow-sm transition-shadow"
              >
                查看 6 堂課架構
              </Link>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {tabMeta.map(({ id, label, color }) => (
            <Link
              key={id}
              to={`/empowerment#${id}`}
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow text-center"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${color} mb-3`}>
                {label}
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {id === 'domestic'
                  ? `${empowermentPrograms.domestic.length} 個方案`
                  : `${empowermentPrograms.international.length} 個方案`}
              </p>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Detail view
  const currentTabMeta = tabMeta.find((t) => t.id === activeTab)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/empowerment"
        className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回培力方案
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <Users className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {currentTabMeta?.label || '培力方案'}
        </h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {activeTab === 'domestic' ? '台灣本土的兒少培力方案' : '國際重要的兒少培力方案'}
      </p>

      <div className="mb-8">
        <SearchBar value={search} onChange={setSearch} placeholder="搜尋培力方案..." />
      </div>

      <div className="space-y-6">
        {filtered.map((program) => (
          <div
            key={program.id}
            className={`rounded-2xl border p-6 ${
              program.featured
                ? 'border-2 border-tag-purple/40 dark:border-tag-purple/40 bg-gradient-to-br from-tag-purple/5 to-white dark:from-slate-800 dark:to-slate-800'
                : 'border-primary-200 dark:border-slate-700 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {program.featured && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-tag-purple text-white mb-2 mr-2">
                    本站原創教案
                  </span>
                )}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 mb-2">
                  {program.organizer}
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{program.title}</h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
              {program.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{program.description}</p>

            {program.downloadUrl && (
              <a
                href={program.downloadUrl}
                download={program.downloadName}
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-tag-purple hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                下載 Word 教案
              </a>
            )}

            <button
              onClick={() => setExpanded((prev) => ({ ...prev, [program.id]: !prev[program.id] }))}
              className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              {expanded[program.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {expanded[program.id] ? '收合' : '查看重點'}
            </button>

            {expanded[program.id] && (
              <div className="mt-4 space-y-4">
                <div className="bg-primary-100/50 dark:bg-primary-900/10 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-300 mb-2">💡 重點摘要</h4>
                  <ul className="space-y-1.5">
                    {program.keyPoints.map((point, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
                        <span className="text-primary-500">•</span>{point}
                      </li>
                    ))}
                  </ul>
                </div>

                {program.structure && (
                  <div className="bg-primary-50 dark:bg-primary-900/15 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-3">📋 課程架構</h4>
                    <div className="space-y-2">
                      {program.structure.map((s) => (
                        <div key={s.unit} className="flex gap-3 items-start">
                          <span className="flex-shrink-0 text-xs font-bold bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded">
                            {s.unit}
                          </span>
                          <div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{s.title}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400"> — {s.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>找不到符合條件的培力方案</p>
          </div>
        )}
      </div>
    </div>
  )
}
