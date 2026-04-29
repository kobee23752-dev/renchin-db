import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { crcTimeline, participationGuide, youthStories } from '../data/crcReview'
import { Globe, Clock, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react'

const tabMeta = [
  { id: 'timeline', label: '審查歷程', icon: Clock },
  { id: 'guide', label: '行動指南', icon: ArrowRight },
  { id: 'stories', label: '兒少故事', icon: MessageCircle },
]

export default function CRCReviewPage() {
  const location = useLocation()
  const hash = location.hash.slice(1)
  const [activeTab, setActiveTab] = useState(hash || 'timeline')
  const [expandedStory, setExpandedStory] = useState({})

  // Sync tab with hash
  useEffect(() => {
    if (hash && tabMeta.some((t) => t.id === hash)) {
      setActiveTab(hash)
    }
  }, [hash])

  // If hash matches a specific tab, show only that tab content with back button
  const isDeepLink = hash && tabMeta.some((t) => t.id === hash)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {isDeepLink && (
        <Link
          to="/crc-review"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回 CRC 國際審查
        </Link>
      )}

      <div className="flex items-center gap-3 mb-2">
        <Globe className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CRC 國際審查與兒少參與</h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        台灣 CRC 審查歷程、如何參與國際審查、兒少參與的故事與反思
      </p>

      {!isDeepLink ? (
        // Index cards
        <div className="grid sm:grid-cols-3 gap-4">
          {tabMeta.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              to={`/crc-review#${id}`}
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow text-center"
            >
              <Icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{label}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <>
          {/* Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">台灣 CRC 審查歷程總覽</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-slate-800" />
                {crcTimeline.map((item) => (
                  <div key={item.id} className="relative pl-12 pb-8">
                    <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                      item.status === '進行中'
                        ? 'bg-primary-600 border-primary-600 animate-pulse'
                        : 'bg-white dark:bg-slate-800 border-primary-500'
                    }`} />
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              item.status === '進行中' ? 'bg-tag-orange text-white' : 'bg-tag-teal text-white'
                            }`}>
                              {item.status}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{item.period}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.round}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-3">{item.description}</p>
                      <ul className="space-y-1">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="text-sm text-gray-500 dark:text-gray-400 flex gap-2">
                            <span className="text-primary-500">•</span>{h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{participationGuide.title}</h2>
                <div className="space-y-4 mb-8">
                  {participationGuide.flowSteps.map((step, i) => (
                    <div key={step.step} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h4 className="font-bold text-gray-900 dark:text-white">{step.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-100/50 dark:bg-primary-900/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-primary-600 dark:text-primary-300 mb-3">
                  📝 {participationGuide.youthReportGuide.title}
                </h3>
                <ul className="space-y-2">
                  {participationGuide.youthReportGuide.points.map((point, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                      <span className="text-primary-600">✓</span>{point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📌 參與管道</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {participationGuide.participationChannels.map((ch) => (
                    <div key={ch.name} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 mb-2">
                        {ch.type}
                      </span>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{ch.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ch.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/15 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300 mb-3">
                  🏛️ {participationGuide.youthRepresentativeInfo.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {participationGuide.youthRepresentativeInfo.description}
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-gray-900 dark:text-white">資格：</strong><span className="text-gray-600 dark:text-gray-300">{participationGuide.youthRepresentativeInfo.eligibility}</span></p>
                  <p><strong className="text-gray-900 dark:text-white">遴選方式：</strong><span className="text-gray-600 dark:text-gray-300">{participationGuide.youthRepresentativeInfo.selectionProcess}</span></p>
                  <p><strong className="text-gray-900 dark:text-white">任期：</strong><span className="text-gray-600 dark:text-gray-300">{participationGuide.youthRepresentativeInfo.term}</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Stories */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">歷屆兒少參與的故事與反思</h2>
              {youthStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{story.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{story.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                      {story.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {story.content && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{story.content}</p>
                    )}

                    {story.qa ? (
                      <div className="space-y-3">
                        {story.qa.map((item, i) => (
                          <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <div className="flex gap-2 mb-2">
                              <HelpCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.q}</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 pl-7">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setExpandedStory((prev) => ({ ...prev, [story.id]: !prev[story.id] }))}
                          className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-500 hover:text-primary-600 font-medium transition-colors"
                        >
                          {expandedStory[story.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          {expandedStory[story.id] ? '收合' : '查看挑戰與收穫'}
                        </button>

                        {expandedStory[story.id] && (
                          <div className="grid sm:grid-cols-2 gap-4 mt-4">
                            <div className="bg-tag-red/5 rounded-xl p-4 border border-tag-red/15">
                              <h4 className="text-sm font-bold text-tag-red mb-2">😰 面臨的挑戰</h4>
                              <ul className="space-y-1">
                                {story.challenges.map((c, i) => (
                                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
                                    <span className="text-tag-red">•</span>{c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-tag-teal/5 rounded-xl p-4 border border-tag-teal/15">
                              <h4 className="text-sm font-bold text-tag-teal mb-2">🌟 收穫與成長</h4>
                              <ul className="space-y-1">
                                {story.gains.map((g, i) => (
                                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
                                    <span className="text-tag-teal">•</span>{g}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
