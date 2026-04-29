/**
 * 將文字中的 **粗體** 和 {{高亮}} 標記轉換為對應的 HTML 元素
 * 用法：<RichText text="這是 **重點** 共 {{1,450件}}" />
 */
export default function RichText({ text, className = '' }) {
  if (!text) return null

  // 拆解 **bold** 和 {{highlight}} 標記
  const parts = text.split(/(\*\*.*?\*\*|\{\{.*?\}\})/)

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-gray-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('{{') && part.endsWith('}}')) {
          return (
            <span
              key={i}
              className="inline-block px-1.5 py-0.5 rounded bg-tag-orange/15 text-tag-orange font-bold border border-tag-orange/30"
            >
              {part.slice(2, -2)}
            </span>
          )
        }
        return part
      })}
    </span>
  )
}
