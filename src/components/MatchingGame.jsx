import { useState, useEffect, useRef } from 'react'
import { Trophy, Clock, RotateCcw, Play, Volume2, VolumeX } from 'lucide-react'

/* ── Audio ── */
const BGM_URL = '/matching-bgm.mp3'
const SFX_MATCH = '/sfx-match.mp3'   // 配對成功 — 削
const SFX_WRONG = '/sfx-wrong.mp3'   // 配對失敗 — 啊喔
const SFX_WIN   = '/sfx-win.mp3'     // 遊戲結束 — 歡呼

function useAudio() {
  const bgmRef = useRef(null)
  const sfxMatchRef = useRef(null)
  const sfxWrongRef = useRef(null)
  const sfxWinRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [bgmReady, setBgmReady] = useState(false)

  useEffect(() => {
    const bgm = new Audio(BGM_URL)
    bgm.loop = true
    bgm.volume = 0.3
    bgmRef.current = bgm
    bgm.addEventListener('canplaythrough', () => setBgmReady(true), { once: true })
    bgm.addEventListener('error', () => setBgmReady(false), { once: true })

    sfxMatchRef.current = new Audio(SFX_MATCH)
    sfxWrongRef.current = new Audio(SFX_WRONG)
    sfxWinRef.current = new Audio(SFX_WIN)
    sfxMatchRef.current.volume = 0.6
    sfxWrongRef.current.volume = 0.5
    sfxWinRef.current.volume = 0.7

    return () => { bgm.pause(); bgm.src = '' }
  }, [])

  function playSfx(ref) {
    const a = ref.current
    if (!a || muted) return
    a.currentTime = 0
    a.play().catch(() => {})
  }

  function playBgm() {
    const a = bgmRef.current
    if (!a || !bgmReady) return
    a.currentTime = 0
    a.muted = muted
    a.play().catch(() => {})
  }

  function stopBgm() {
    const a = bgmRef.current
    if (!a) return
    a.pause()
    a.currentTime = 0
  }

  function toggleMute() {
    setMuted((prev) => {
      const next = !prev
      if (bgmRef.current) bgmRef.current.muted = next
      return next
    })
  }

  return {
    playBgm, stopBgm, muted, toggleMute, bgmReady,
    playMatch: () => playSfx(sfxMatchRef),
    playWrong: () => playSfx(sfxWrongRef),
    playWin:   () => playSfx(sfxWinRef),
  }
}

/* ── 卡片內容 ── */
const allSentences = [
  { id: 1, text: '每個人都有表達想法的權利', color: 'blue' },
  { id: 2, text: '說出來的話值得被認真聽', color: 'blue' },
  { id: 3, text: '不想說的時候也沒關係', color: 'blue' },
  { id: 4, text: '你的想法很重要', color: 'blue' },
  { id: 5, text: '可以用說的、寫的、畫的來表達', color: 'green' },
  { id: 6, text: '安全的環境讓人更願意開口', color: 'green' },
  { id: 7, text: '好的討論需要互相尊重', color: 'green' },
  { id: 8, text: '每個人的聲音都一樣珍貴', color: 'green' },
  { id: 9, text: '表達意見是一件勇敢的事', color: 'purple' },
  { id: 10, text: '用你聽得懂的方式一起討論', color: 'purple' },
  { id: 11, text: '一起做的決定會更好', color: 'purple' },
  { id: 12, text: '說出來，世界會不一樣', color: 'purple' },
]

const levels = [
  { id: 'beginner', label: '入門組', pairs: 4, cols: 4, emoji: '🌱', description: '8 張卡片、4 組配對' },
  { id: 'intermediate', label: '進階組', pairs: 8, cols: 4, emoji: '🌿', description: '16 張卡片、8 組配對' },
  { id: 'challenge', label: '挑戰組', pairs: 12, cols: 6, emoji: '🌳', description: '24 張卡片、12 組配對' },
]

const colorMap = {
  blue: { light: 'bg-tag-blue/10', border: 'border-tag-blue/30', text: 'text-tag-blue' },
  green: { light: 'bg-tag-green/10', border: 'border-tag-green/30', text: 'text-tag-green' },
  purple: { light: 'bg-tag-purple/10', border: 'border-tag-purple/30', text: 'text-tag-purple' },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createCards(pairCount) {
  const selected = allSentences.slice(0, pairCount)
  const cards = []
  selected.forEach((s) => {
    cards.push({ uid: `${s.id}-a`, pairId: s.id, text: s.text, color: s.color })
    cards.push({ uid: `${s.id}-b`, pairId: s.id, text: s.text, color: s.color })
  })
  return shuffle(cards)
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  const cs = Math.floor((ms % 1000) / 10)
  return `${min > 0 ? `${min}:` : ''}${min > 0 ? String(sec).padStart(2, '0') : sec}.${String(cs).padStart(2, '0')}`
}

export default function MatchingGame() {
  const [phase, setPhase] = useState('idle') // idle | playing | complete
  const [level, setLevel] = useState(null)
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])   // uid[]
  const [matched, setMatched] = useState([])    // pairId[]
  const [elapsed, setElapsed] = useState(0)
  const [bestTimes, setBestTimes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('renchin-match-best') || '{}') }
    catch { return {} }
  })

  const lockRef = useRef(false)
  const timerRef = useRef(null)
  const audio = useAudio()

  // ── 計時器 ──
  useEffect(() => {
    if (phase === 'playing') {
      const t0 = Date.now() - elapsed
      timerRef.current = setInterval(() => setElapsed(Date.now() - t0), 50)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  // ── 勝利偵測：matched 改變時檢查 ──
  // 用 cards.length / 2 推算需要的配對數，這個值不依賴任何 ref 或 closure
  useEffect(() => {
    if (phase !== 'playing') return
    if (cards.length === 0) return

    const requiredPairs = cards.length / 2
    if (matched.length <= 0 || matched.length < requiredPairs) return

    // 全部配對完成！
    clearInterval(timerRef.current)
    setPhase('complete')
    audio.stopBgm()
    audio.playWin()

    // 儲存最佳紀錄
    if (level) {
      setBestTimes((prev) => {
        const old = prev[level.id]
        if (!old || elapsed < old) {
          const next = { ...prev, [level.id]: elapsed }
          localStorage.setItem('renchin-match-best', JSON.stringify(next))
          return next
        }
        return prev
      })
    }
  }, [matched])

  // ── 開始遊戲 ──
  function startGame(lv) {
    setLevel(lv)
    setCards(createCards(lv.pairs))
    setFlipped([])
    setMatched([])
    setElapsed(0)
    lockRef.current = false
    setPhase('playing')
    audio.playBgm()
  }

  // ── 翻牌 ──
  function handleFlip(card) {
    if (lockRef.current) return
    if (phase !== 'playing') return
    if (flipped.includes(card.uid)) return
    if (matched.includes(card.pairId)) return

    const next = [...flipped, card.uid]
    setFlipped(next)

    if (next.length < 2) return

    // 翻了兩張 → 鎖定
    lockRef.current = true
    const first = cards.find((c) => c.uid === next[0])
    const second = card

    if (first.pairId === second.pairId && first.uid !== second.uid) {
      // 配對成功
      audio.playMatch()
      setTimeout(() => {
        setMatched((prev) => [...prev, first.pairId])
        setFlipped([])
        lockRef.current = false
      }, 400)
    } else {
      // 配對失敗
      audio.playWrong()
      setTimeout(() => {
        setFlipped([])
        lockRef.current = false
      }, 400)
    }
  }

  // ═══════════════════════════════════════
  //  IDLE
  // ═══════════════════════════════════════
  if (phase === 'idle') {
    return (
      <div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎮 遊戲規則</h2>
          <div className="space-y-3 text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">
            {[
              ['1', <>每張卡片上有一句關於表意權的話，<strong className="text-gray-900 dark:text-white">每句話都有兩張一模一樣的卡片</strong>。</>],
              ['2', <>每次翻開兩張，如果<strong className="text-gray-900 dark:text-white">內容一樣就配對成功</strong>，卡片會消失。</>],
              ['3', <>如果不一樣，卡片會翻回去，<strong className="text-gray-900 dark:text-white">記住位置</strong>再試一次！</>],
              ['4', <>全部配對完成就過關，看看你花了<strong className="text-gray-900 dark:text-white">多少時間</strong>！</>],
            ].map(([n, text]) => (
              <div key={n} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-tag-orange/10 text-tag-orange flex items-center justify-center font-bold text-sm">{n}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">選擇難度</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {levels.map((lv) => {
            const best = bestTimes[lv.id]
            return (
              <button key={lv.id} onClick={() => startGame(lv)} className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow text-center group">
                <span className="text-4xl block mb-2">{lv.emoji}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{lv.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{lv.description}</p>
                {best && (
                  <p className="text-xs text-tag-orange font-medium">
                    <Trophy className="w-3.5 h-3.5 inline mr-1" />最佳 {formatTime(best)}
                  </p>
                )}
                <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-tag-orange text-white rounded-lg text-sm font-medium group-hover:opacity-90 transition-opacity">
                  <Play className="w-4 h-4" />開始挑戰
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════
  //  COMPLETE
  // ═══════════════════════════════════════
  if (phase === 'complete') {
    const best = bestTimes[level?.id]
    const isNewBest = best === elapsed

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">恭喜完成！</h2>
        <p className="text-sm text-gray-500 mb-2">{level.label} — 全部 {level.pairs} 組配對成功</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tag-orange/10 text-tag-orange font-bold text-xl mb-2">
          <Clock className="w-5 h-5" />{formatTime(elapsed)}
        </div>
        {isNewBest && <p className="text-tag-red font-bold text-sm mb-4">🏆 新紀錄！</p>}
        {best && !isNewBest && <p className="text-sm text-gray-400 mb-4">最佳紀錄：{formatTime(best)}</p>}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button onClick={() => startGame(level)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-tag-orange text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            <RotateCcw className="w-4 h-4" />再挑戰一次
          </button>
          <button onClick={() => { setPhase('idle'); setLevel(null); audio.stopBgm() }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
            換難度
          </button>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════
  //  PLAYING
  // ═══════════════════════════════════════
  const requiredPairs = cards.length / 2
  const gridCols = level?.cols === 6 ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-4'
  // 入門組(8張) 3:4，進階組(16張) 4:3，挑戰組(24張) 5:3
  const cardAspect = requiredPairs <= 4 ? 'aspect-[4/3]' : requiredPairs <= 8 ? 'aspect-[3/2]' : 'aspect-[3/2]'

  return (
    <div>
      {/* 頂部狀態列 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tag-orange/10 text-tag-orange font-bold text-lg">
            <Clock className="w-5 h-5" />{formatTime(elapsed)}
          </div>
          <span className="text-sm text-gray-400">
            {matched.length} / {requiredPairs} 組
          </span>
        </div>
        <div className="flex items-center gap-3">
          {audio.bgmReady && (
            <button onClick={audio.toggleMute} className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors" title={audio.muted ? '開啟音樂' : '靜音'}>
              {audio.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
          <span className="text-xs text-gray-400 hidden sm:inline">{level.label}</span>
          {bestTimes[level.id] && (
            <span className="text-xs text-gray-400">
              <Trophy className="w-3.5 h-3.5 inline mr-1" />{formatTime(bestTimes[level.id])}
            </span>
          )}
        </div>
      </div>

      {/* 卡片區 */}
      <div className={`grid ${gridCols} gap-2 sm:gap-3`}>
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.uid)
          const isMatched = matched.includes(card.pairId)
          const colors = colorMap[card.color]

          if (isMatched) {
            return <div key={card.uid} className={`${cardAspect} rounded-xl opacity-0 transition-opacity duration-500`} />
          }

          return (
            <div key={card.uid} onClick={() => handleFlip(card)} className={`${cardAspect} cursor-pointer perspective-500`}>
              <div className={`relative w-full h-full transition-transform duration-300 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-primary-200 to-primary-300 dark:from-slate-600 dark:to-slate-700 border-2 border-primary-300 dark:border-slate-500 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl opacity-40">❓</span>
                </div>
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl ${colors.light} border-2 ${colors.border} flex items-center justify-center p-3 text-center`}>
                  <span className={`text-sm sm:text-base font-bold ${colors.text} leading-tight`}>{card.text}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
