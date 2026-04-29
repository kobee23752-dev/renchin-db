export default function TagFilter({ tags, activeTags, onToggle }) {
  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggle(tag)}
          className={`px-3 py-1 rounded-xl text-sm font-medium transition-all ${
            activeTags.includes(tag)
              ? 'bg-primary-500 text-white border border-primary-600'
              : 'bg-primary-50 text-gray-600 border border-primary-200 hover:border-primary-500 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700'
          }`}
        >
          #{tag}
        </button>
      ))}
      {activeTags.length > 0 && (
        <button
          onClick={() => activeTags.forEach((t) => onToggle(t))}
          className="px-3 py-1 text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400"
        >
          清除篩選 ✕
        </button>
      )}
    </div>
  )
}
