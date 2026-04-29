import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══ 題庫（30 題）═══ */
const allQuestions = [
  { question: '「表意權」是什麼意思？', correct: '孩子有權利說出自己的想法', wrong: ['大人說什麼就聽什麼', '只有大人可以發言', '小孩不能有意見'] },
  { question: '哪一條國際法保障了兒童的表意權？', correct: '兒童權利公約第 12 條', wrong: ['道路交通管理規則', '動物保護法', '個人資料保護法'] },
  { question: '大人做跟你有關的決定，卻沒問你，這樣對嗎？', correct: '不對，應該聽孩子的想法', wrong: ['對，大人比較懂', '對，小孩不需要知道', '大人決定就好了'] },
  { question: '表達意見只能用「說」的嗎？', correct: '不是，畫的、寫的、演的都算', wrong: ['是，一定要開口說', '只能寫作文', '只有舉手才算'] },
  { question: '如果你現在不想說，可以嗎？', correct: '可以，不說也是你的權利', wrong: ['不行，一定要發言', '不可以，會被處罰', '不說就代表沒意見'] },
  { question: '大人聽完意見後應該怎麼做？', correct: '告訴你他們怎麼考量的', wrong: ['聽完就好不用回應', '假裝聽了就行', '叫你不要再說了'] },
  { question: '學校要改校規，誰的意見應該被聽見？', correct: '學生的意見也要被聽見', wrong: ['只有校長說了算', '只有老師可以決定', '學生不能管這些事'] },
  { question: '表意權適用於幾歲的孩子？', correct: '任何年齡都適用', wrong: ['只有 12 歲以上', '只有國中生以上', '要 18 歲才可以'] },
  { question: '你的意見跟大家不一樣，還能說嗎？', correct: '可以，不同意見也很重要', wrong: ['不行，要跟大家一樣', '少數意見不重要', '只能私下偷偷說'] },
  { question: '誰應該決定你要不要參加課外活動？', correct: '應該聽聽你自己的意見', wrong: ['只有爸媽決定', '老師說了算', '同學投票決定'] },
  { question: '兒童權利公約是誰制定的？', correct: '聯合國', wrong: ['台灣政府', '美國總統', '學校校長'] },
  { question: '台灣有把 CRC 變成法律嗎？', correct: '有，叫做 CRC 施行法', wrong: ['沒有', '只是參考而已', '還在討論中'] },
  { question: '「Lundy 模型」跟什麼有關？', correct: '兒童參與的四個面向', wrong: ['數學公式', '天氣預報', '烹飪食譜'] },
  { question: '表意權包不包括「用畫圖表達」？', correct: '包括，任何方式都可以', wrong: ['不包括，只能說', '要寫字才算', '只有大聲說才算'] },
  { question: '下列哪個是表意權的精神？', correct: '認真聽孩子怎麼想', wrong: ['大人永遠是對的', '小孩要聽話', '安靜才是乖'] },
  { question: '如果社工來家訪問你意見，你可以怎麼做？', correct: '先問保密範圍再決定說什麼', wrong: ['什麼都不能說', '一定要全部說', '只能說好話'] },
  { question: '班會上有人不敢舉手，怎麼幫助他？', correct: '用匿名小紙條讓大家寫想法', wrong: ['不理他', '叫他勇敢一點', '跳過他就好'] },
  { question: '大人說「小孩懂什麼」，這樣對嗎？', correct: '不對，孩子的想法也有價值', wrong: ['對，小孩真的不懂', '大人說的都對', '年紀小就不能有意見'] },
  { question: '兒少代表是做什麼的？', correct: '代表孩子參與政策討論', wrong: ['幫老師跑腿', '管理班級秩序', '負責打掃教室'] },
  { question: '法院在處理跟小孩有關的案件時，應該怎麼做？', correct: '讓孩子有機會表達意見', wrong: ['不用問小孩', '只聽大人的就好', '小孩不能進法院'] },
  { question: '哪種情況需要聽孩子的意見？', correct: '轉學、搬家等跟孩子有關的事', wrong: ['只有吃什麼的時候', '大人開會的時候', '買東西的時候'] },
  { question: '表意權可以被取消嗎？', correct: '不行，這是每個孩子的權利', wrong: ['考試考不好就取消', '不乖就取消', '老師可以取消'] },
  { question: '在學校裡，表意權可以怎麼實踐？', correct: '讓學生參與校規討論', wrong: ['學生只要聽話', '老師說了算', '校長全權決定'] },
  { question: '如果你對學校午餐有意見，可以怎麼做？', correct: '跟老師或學校反映', wrong: ['忍耐就好', '小孩不能管這個', '只能回家吃'] },
  { question: '下列哪個不是表達意見的方式？', correct: '以上都是表達方式', wrong: ['寫信', '畫圖', '拍影片'] },
  { question: '為什麼孩子的意見很重要？', correct: '孩子有大人看不到的視角', wrong: ['其實不太重要', '因為孩子比較可愛', '只是做做樣子'] },
  { question: '「回饋」在表意權裡是什麼意思？', correct: '告訴孩子意見被怎麼處理了', wrong: ['給孩子零用錢', '稱讚孩子很乖', '讓孩子出去玩'] },
  { question: '如果大人沒採納你的意見，應該怎樣？', correct: '跟你解釋為什麼', wrong: ['不用說明', '罵你不懂事', '假裝你沒說過'] },
  { question: '全世界大概幾個國家簽了 CRC？', correct: '幾乎所有國家都簽了', wrong: ['只有 10 個', '只有台灣', '沒有國家簽'] },
  { question: '表意權最核心的精神是什麼？', correct: '每個孩子的聲音都值得被聽見', wrong: ['聽話才是好孩子', '大人永遠是對的', '安靜最重要'] },
]

/* ═══ 難度 ═══ */
const difficulties = [
  { id: 'easy', label: '入門組', desc: '氣球停留 8 秒', seconds: 8, emoji: '🟢' },
  { id: 'medium', label: '進階組', desc: '氣球停留 5 秒', seconds: 5, emoji: '🟡' },
  { id: 'hard', label: '挑戰組', desc: '氣球停留 3 秒', seconds: 3, emoji: '🔴' },
]

/* ═══ 氣球顏色 ═══ */
const balloonColors = [
  { fill: '#FDA4AF', stroke: '#F43F5E' },
  { fill: '#93C5FD', stroke: '#3B82F6' },
  { fill: '#86EFAC', stroke: '#22C55E' },
  { fill: '#FDE68A', stroke: '#F59E0B' },
]

/* ═══ 工具 ═══ */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function makeDriftVars() {
  return {
    '--dx1': `${rand(-25, 25)}px`,
    '--dy1': `${rand(-20, 20)}px`,
    '--dx2': `${rand(-35, 35)}px`,
    '--dy2': `${rand(-25, 25)}px`,
    '--dx3': `${rand(-30, 30)}px`,
    '--dy3': `${rand(-20, 20)}px`,
    '--dx4': `${rand(-35, 35)}px`,
    '--dy4': `${rand(-25, 25)}px`,
    '--drift-duration': `${(2 + Math.random() * 2).toFixed(1)}s`,
  }
}

/* ═══ 氣球 ═══ */
function Balloon({ color, text, onClick, posStyle, driftStyle, visible, className = '' }) {
  return (
    <div
      className={`absolute transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      style={posStyle}
    >
      <button
        onClick={visible ? onClick : undefined}
        className={`animate-balloon-drift ${visible ? 'cursor-crosshair' : 'pointer-events-none'} block ${className}`}
        style={{ width: 120, height: 155, ...driftStyle }}
      >
        <svg width="120" height="155" viewBox="0 0 120 155" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 118 Q55 132 58 150" stroke={color.stroke} strokeWidth="1.5" fill="none" opacity="0.5" />
          <ellipse cx="60" cy="63" rx="48" ry="55" fill={color.fill} stroke={color.stroke} strokeWidth="2" />
          <path d="M55 115 L60 122 L65 115" fill={color.fill} stroke={color.stroke} strokeWidth="1.5" />
          <ellipse cx="42" cy="43" rx="10" ry="14" fill="white" opacity="0.35" transform="rotate(-20 42 43)" />
        </svg>
        <span
          className="absolute inset-x-3 top-3 flex items-center justify-center text-xs md:text-sm font-bold text-gray-800 leading-snug text-center"
          style={{ height: 105 }}
        >
          {text}
        </span>
      </button>
    </div>
  )
}

/* ═══ 主元件 ═══ */
export default function BalloonShooter() {
  const [phase, setPhase] = useState('menu')
  const [difficulty, setDifficulty] = useState(null)
  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [options, setOptions] = useState([])       // { id, text, isCorrect, color, posStyle, driftVars, visible, popAnim }
  const [feedback, setFeedback] = useState(null)
  const timersRef = useRef([])                      // 每顆氣球獨立的消失計時器
  const countdownRef = useRef(null)
  const bgmRef = useRef(null)
  const lockedRef = useRef(false)                   // 防止連點

  function clearAllTimers() {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
    if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null }
  }

  // BGM
  useEffect(() => {
    const a = new Audio('/game-bgm.mp3'); a.loop = true; a.volume = 0.35; bgmRef.current = a
    return () => { a.pause(); a.src = '' }
  }, [])
  function startBgm() { const a = bgmRef.current; if (a) { a.currentTime = 3; a.play().catch(() => {}) } }
  function stopBgm() { const a = bgmRef.current; if (a) { a.pause(); a.currentTime = 0 } }
  function playPopSfx() {
    const sfx = new Audio('/pop-sfx.mp3')
    sfx.volume = 0.6
    sfx.play().catch(() => {})
  }
  function playWrongSfx() {
    const sfx = new Audio('/wrong-sfx.mp3')
    sfx.volume = 0.6
    sfx.play().catch(() => {})
  }
  function playCheerSfx() {
    const sfx = new Audio('/cheer-sfx.mp3')
    sfx.volume = 0.7
    sfx.play().catch(() => {})
  }
  useEffect(() => () => { clearAllTimers(); stopBgm() }, [])

  // 建一題選項
  function buildOptions(q, idx) {
    const zones = shuffle([
      { xMin: 3, xMax: 12, yMin: 5, yMax: 20 },
      { xMin: 26, xMax: 35, yMin: 30, yMax: 45 },
      { xMin: 48, xMax: 55, yMin: 5, yMax: 20 },
      { xMin: 68, xMax: 75, yMin: 30, yMax: 45 },
    ])
    return [q.correct, ...q.wrong]
      .sort(() => Math.random() - 0.5)
      .map((text, i) => {
        const zone = zones[i]
        return {
          id: `${idx}-${i}-${Date.now()}`,
          text,
          isCorrect: text === q.correct,
          color: balloonColors[i % balloonColors.length],
          posStyle: { left: `${rand(zone.xMin, zone.xMax)}%`, top: `${rand(zone.yMin, zone.yMax)}%` },
          driftVars: makeDriftVars(),
          visible: false,       // 一開始隱藏，錯開出現
          popAnim: false,
          appearDelay: rand(0, 600) + i * rand(300, 600),  // 每顆隨機錯開 0.3~0.6 秒
          disappearAt: null,    // 各自的消失時間（相對於出現）
        }
      })
  }

  // 開始下一題
  const nextQuestion = useCallback((qs, idx, diff) => {
    if (idx >= qs.length) { clearAllTimers(); stopBgm(); playCheerSfx(); setPhase('result'); return }

    const q = qs[idx]
    const opts = buildOptions(q, idx)
    setQIndex(idx)
    setOptions(opts)
    setFeedback(null)
    lockedRef.current = false

    // 清舊計時器
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []

    // 每顆氣球獨立出現 + 獨立消失
    opts.forEach((opt, i) => {
      // 出現
      const showTimer = setTimeout(() => {
        setOptions(prev => prev.map(o => o.id === opt.id ? { ...o, visible: true } : o))
      }, opt.appearDelay)
      timersRef.current.push(showTimer)

      // 消失（出現後 N 秒）— 加上隨機偏移讓每顆不同時消失
      const lifespan = (diff.seconds * 1000) + rand(-800, 800)
      const hideTimer = setTimeout(() => {
        setOptions(prev => prev.map(o => o.id === opt.id ? { ...o, visible: false } : o))
      }, opt.appearDelay + Math.max(lifespan, 1500))
      timersRef.current.push(hideTimer)
    })

    // 全部消失後跳下一題（最晚的消失時間 + buffer）
    const maxTime = Math.max(...opts.map((o, i) => o.appearDelay + (diff.seconds * 1000) + 800))
    const nextTimer = setTimeout(() => {
      // 如果還沒被答對，跳下一題
      if (!lockedRef.current) {
        lockedRef.current = true
        nextQuestion(qs, idx + 1, diff)
      }
    }, maxTime + 600)
    timersRef.current.push(nextTimer)
  }, [])

  function startGame(diff) {
    clearAllTimers()
    const shuffled = shuffle(allQuestions)
    setQuestions(shuffled)
    setDifficulty(diff)
    setScore(0)
    setTimeLeft(60)
    setPhase('playing')
    startBgm()
    nextQuestion(shuffled, 0, diff)

    countdownRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearAllTimers(); stopBgm(); playCheerSfx(); setPhase('result'); return 0 }
        return t - 1
      })
    }, 1000)
  }

  function handleClick(opt) {
    if (lockedRef.current || feedback) return
    lockedRef.current = true

    // 清所有氣球計時器（防止繼續消失）
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []

    if (opt.isCorrect) {
      playPopSfx()
      setOptions(prev => prev.map(o => o.id === opt.id ? { ...o, popAnim: true } : { ...o, visible: false }))
      setScore(s => s + 10)
      setFeedback({ type: 'correct', text: '+10 分！' })
      setTimeout(() => nextQuestion(questions, qIndex + 1, difficulty), 800)
    } else {
      playWrongSfx()
      setOptions(prev => prev.map(o => o.id === opt.id ? { ...o, popAnim: true } : o))
      setFeedback({ type: 'wrong', text: '正解：' + questions[qIndex].correct })
      setTimeout(() => {
        setOptions(prev => prev.map(o => ({ ...o, visible: false })))
        setTimeout(() => nextQuestion(questions, qIndex + 1, difficulty), 400)
      }, 1000)
    }
  }

  // ─── 選難度 ───
  if (phase === 'menu') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">我是神槍手</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-1">射中正確答案的氣球得 10 分！</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">限時 60 秒，氣球會到處飄、還會消失喔！</p>
        <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-4">選擇難度</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {difficulties.map(d => (
            <button
              key={d.id}
              onClick={() => startGame(d)}
              className="px-6 py-4 bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-700 rounded-2xl hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl block mb-1">{d.emoji}</span>
              <span className="font-bold text-gray-900 dark:text-white">{d.label}</span>
              <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">{d.desc}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ─── 結算 ───
  if (phase === 'result') {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">{score >= 200 ? '🏆' : score >= 150 ? '🎉' : score >= 100 ? '⭐' : score >= 50 ? '👍' : '💪'}</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {score >= 200 ? '神槍手！' : score >= 150 ? '超級厲害！' : score >= 100 ? '表現不錯！' : score >= 50 ? '繼續練習！' : '加油！'}
        </h2>
        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{score} 分</div>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">難度：{difficulty?.label}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">答對 {score / 10} 題</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => startGame(difficulty)} className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors">再玩一次</button>
          <button onClick={() => { clearAllTimers(); stopBgm(); setPhase('menu') }} className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-700 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors">換難度</button>
        </div>
      </div>
    )
  }

  // ─── 遊戲中 ───
  const q = questions[qIndex]
  if (!q) return null

  return (
    <div>
      {/* 狀態列 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className={`text-lg font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`}>
          ⏱ {timeLeft}s
        </div>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800">
          {difficulty?.label}
        </span>
        <div className="text-lg font-bold text-primary-600 dark:text-primary-400 tabular-nums">
          🎯 {score} 分
        </div>
      </div>

      {/* 題目 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-3 border border-primary-200 dark:border-slate-700 text-center shadow-sm">
        <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{q.question}</p>
      </div>

      {/* 氣球區 */}
      <div
        className="relative bg-gradient-to-b from-sky-100 to-sky-50 dark:from-sky-950/30 dark:to-slate-800 rounded-2xl border border-sky-200 dark:border-slate-700 overflow-hidden"
        style={{ height: 360, cursor: 'crosshair' }}
      >
        {/* 雲朵 */}
        <div className="absolute top-4 left-[8%] w-16 h-6 bg-white/60 rounded-full" />
        <div className="absolute top-10 right-[10%] w-20 h-7 bg-white/50 rounded-full" />
        <div className="absolute top-[55%] left-[45%] w-12 h-5 bg-white/30 rounded-full" />

        {options.map(opt => {
          if (opt.popAnim) {
            return (
              <div key={opt.id} className="absolute animate-balloon-pop" style={{ ...opt.posStyle, width: 120, height: 155 }}>
                <span className="text-5xl flex items-center justify-center h-full">💥</span>
              </div>
            )
          }
          return (
            <Balloon
              key={opt.id}
              color={opt.color}
              text={opt.text}
              visible={opt.visible}
              onClick={() => handleClick(opt)}
              posStyle={opt.posStyle}
              driftStyle={opt.driftVars}
              className={feedback ? 'pointer-events-none' : ''}
            />
          )
        })}

        {/* 回饋 */}
        {feedback && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center z-10">
            <div className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-lg ${
              feedback.type === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {feedback.text}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
