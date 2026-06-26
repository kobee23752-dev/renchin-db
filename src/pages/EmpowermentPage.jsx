import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { empowermentPrograms } from '../data/empowerment'
import { curriculumSessions } from '../data/curriculum'
import SearchBar from '../components/SearchBar'
import { Users, ChevronDown, ChevronUp, ChevronRight, ArrowLeft, Download, Clock } from 'lucide-react'

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
  const sessionMatch = hash.match(/^original-(\d)$/)
  const activeSession = sessionMatch
    ? curriculumSessions.find((s) => s.no === Number(sessionMatch[1]))
    : null
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

  // ===== 單一堂課 — 詳細內容 =====
  if (activeSession) {
    const s = activeSession
    const idx = curriculumSessions.findIndex((x) => x.no === s.no)
    const prev = curriculumSessions[idx - 1]
    const next = curriculumSessions[idx + 1]
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          to="/empowerment#original"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回課程總覽
        </Link>

        {/* 標題列 */}
        <div className="rounded-2xl bg-tag-purple p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/25 text-white">第 {s.no} 堂</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/15 text-white">{s.dimension}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{s.title}</h1>
          <p className="text-white/80 text-sm italic">核心提問：{s.question}</p>
        </div>

        {/* 基本資訊 */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4 text-tag-purple" />{s.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
            依據：{s.basis}
          </span>
        </div>

        {/* 下載 */}
        <a
          href={s.downloadUrl}
          download={s.downloadName}
          className="inline-flex items-center gap-2 px-5 py-3 mb-8 bg-tag-purple hover:opacity-90 text-white rounded-xl text-base font-semibold transition-opacity shadow-sm"
        >
          <Download className="w-5 h-5" />
          下載這堂課的教案{s.worksheet ? '與學習單' : ''}
        </a>

        {/* 學習目標 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🎯 學習目標</h2>
        <ol className="space-y-2 mb-8">
          {s.goals.map((g, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tag-purple/15 text-tag-purple text-sm font-bold flex items-center justify-center">{i + 1}</span>
              {g}
            </li>
          ))}
        </ol>

        {/* 教材教具 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🧰 教材教具</h2>
        <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{s.materials}</p>

        {/* 活動流程 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📋 活動流程</h2>
        <div className="space-y-3 mb-8">
          {s.flow.map(([time, act, detail], i) => (
            <div key={i} className="flex gap-4 items-start bg-white dark:bg-slate-800 rounded-xl border border-primary-200 dark:border-slate-700 p-4">
              <div className="flex-shrink-0 text-center">
                <span className="block px-2.5 py-1 rounded-lg text-xs font-bold bg-tag-purple/15 text-tag-purple whitespace-nowrap">{time}</span>
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-0.5">{act}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 引導提問 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💬 帶領者引導提問</h2>
        <ul className="space-y-2 mb-8">
          {s.questions.map((q, i) => (
            <li key={i} className="flex gap-2 text-[15px] text-gray-700 dark:text-gray-300">
              <span className="text-tag-purple flex-shrink-0">？</span>{q}
            </li>
          ))}
        </ul>

        {/* 帶領小提醒 */}
        <div className="rounded-xl bg-tag-purple/5 border-l-4 border-tag-purple p-5 mb-8">
          <h3 className="text-sm font-bold text-tag-purple mb-1.5">帶領小提醒</h3>
          <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">{s.tip}</p>
        </div>

        {/* 延伸與檢核 */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-primary-200 dark:border-slate-700 p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">延伸／回家任務</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{s.extension}</p>
          </div>
          <div className="rounded-xl border border-primary-200 dark:border-slate-700 p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">本堂檢核（{s.dimension}）</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{s.check}</p>
          </div>
        </div>

        {/* 上一堂／下一堂 */}
        <div className="flex items-center justify-between gap-3 border-t border-primary-100 dark:border-slate-700 pt-6">
          {prev ? (
            <Link to={`/empowerment#original-${prev.no}`} className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">
              <ArrowLeft className="w-4 h-4" />第 {prev.no} 堂・{prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/empowerment#original-${next.no}`} className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">
              第 {next.no} 堂・{next.title}<ChevronRight className="w-4 h-4" />
            </Link>
          ) : <span />}
        </div>
      </div>
    )
  }

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

        {/* 六堂課架構 — 點各堂可看完整內容並下載 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">📋 六堂課架構</h2>
          <span className="text-xs text-gray-400">點各堂查看內容與下載</span>
        </div>
        <div className="space-y-3 mb-8">
          {curriculumSessions.map((s) => (
            <Link
              key={s.no}
              to={`/empowerment#original-${s.no}`}
              className="group flex gap-4 items-center bg-white dark:bg-slate-800 rounded-xl border border-primary-200 dark:border-slate-700 p-4 hover:border-tag-purple/60 hover:shadow-md transition-all"
            >
              <span className="flex-shrink-0 px-3 py-1 rounded-lg text-sm font-bold bg-tag-purple/15 text-tag-purple dark:bg-tag-purple/25 dark:text-tag-purple">
                第 {s.no} 堂
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{s.summary}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-tag-purple group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
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
