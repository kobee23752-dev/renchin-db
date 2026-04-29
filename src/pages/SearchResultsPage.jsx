import { useSearchParams, Link } from 'react-router-dom'
import { laws } from '../data/laws'
import { literature } from '../data/literature'
import { tools } from '../data/tools'
import { crcTimeline, youthStories } from '../data/crcReview'
import { empowermentPrograms } from '../data/empowerment'
import { Search } from 'lucide-react'

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
      results.push({ ...item, type: '培力方案', link: '/empowerment' })
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

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = searchAll(query)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <Search className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">搜尋結果</h1>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        搜尋「{query}」找到 {results.length} 筆資料
      </p>

      {results.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg">找不到相關資料</p>
          <p className="text-sm mt-1">試試其他關鍵字</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="block bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${typeBadgeColors[item.type] || 'bg-gray-100 text-gray-600'}`}>
                    {item.type}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  {item.author && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.author}（{item.year}）
                    </p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {item.plainText || item.summary || item.description || item.content || ''}
                  </p>
                </div>
              </div>
              {item.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      #{tag}
                    </span>
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
