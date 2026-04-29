import { quizQuestions } from '../data/kidsContent'
import Quiz from '../components/Quiz'
import { Sparkles } from 'lucide-react'

const kidsFont = { fontFamily: '"BpmfZihiSerif", Georgia, "Noto Serif TC", serif' }

export default function QuizPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10" style={kidsFont}>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tag-orange/10 text-tag-orange text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          互動測驗
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          表意權情境小測驗
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          遇到這些生活情境，你會怎麼做呢？
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          共 {quizQuestions.length} 題，沒有對錯，只想聽聽你的想法
        </p>
      </div>

      <Quiz questions={quizQuestions} />
    </div>
  )
}
