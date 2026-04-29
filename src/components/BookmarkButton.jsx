import { Bookmark } from 'lucide-react'

export default function BookmarkButton({ id, bookmarks, toggleBookmark }) {
  const isBookmarked = bookmarks.includes(id)

  return (
    <button
      onClick={() => toggleBookmark(id)}
      className={`p-1.5 rounded-lg transition-all ${
        isBookmarked
          ? 'text-primary-600 hover:text-primary-600 scale-110'
          : 'text-gray-400 hover:text-primary-500'
      }`}
      aria-label={isBookmarked ? '取消收藏' : '加入收藏'}
      title={isBookmarked ? '取消收藏' : '加入收藏'}
    >
      <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
    </button>
  )
}
