import { useState } from 'react'
import { ChevronRight, RotateCcw } from 'lucide-react'
import { quizResults } from '../data/kidsContent'

export default function Quiz({ questions }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [totalScore, setTotalScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  function handleSelect(index) {
    if (selected !== null) return
    setSelected(index)
    setTotalScore(totalScore + q.options[index].score)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setTotalScore(0)
    setFinished(false)
  }

  if (finished) {
    const result = quizResults.find((r) => totalScore >= r.min && totalScore <= r.max)
      || quizResults[quizResults.length - 1]

    return (
      <div className="bg-gradient-to-br from-primary-100/60 to-accent-100/30 dark:from-primary-900/20 dark:to-accent-900/10 rounded-2xl p-8 text-center border border-primary-200/50 dark:border-slate-700">
        <div className="text-6xl mb-4">{result.emoji}</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {result.title}
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
          你的得分：{totalScore} / {questions.length * 3} 分
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto mb-8">
          {result.message}
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          再試一次
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden border border-primary-100 dark:border-slate-700">
      {/* Progress bar */}
      <div className="bg-primary-50 dark:bg-gray-700 px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          第 {current + 1} / {questions.length} 題
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < current ? 'bg-primary-500' : i === current ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Scenario */}
        <div className="bg-primary-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-primary-600 dark:text-primary-500 font-medium mb-1">情境</p>
          <p className="text-gray-800 dark:text-gray-200">{q.scenario}</p>
        </div>

        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{q.question}</h4>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                selected === null
                  ? 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer'
                  : selected === i
                  ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-600 opacity-50'
              }`}
            >
              <div>
                <p className="text-gray-800 dark:text-gray-200">{opt.text}</p>
                {selected === i && (
                  <p className="text-sm text-primary-600 dark:text-primary-400 mt-2 leading-relaxed">
                    💬 {opt.note}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Next button */}
        {selected !== null && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {current + 1 >= questions.length ? '看結果' : '下一題'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
