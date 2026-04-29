import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { kidsIntro } from '../data/kidsContent'
import { Sparkles, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import MatchingGame from '../components/MatchingGame'
import BalloonShooter from '../components/BalloonShooter'
import MetroGame from '../components/MetroGame'
import {
  IllustCover, IllustForest, IllustBridge, IllustRabbit, IllustSad,
  IllustFriends, IllustOwl, IllustBrave, IllustSurprise, IllustPath,
  IllustChair, IllustEnd,
} from '../components/StoryIllustrations'

const kidsFont = { fontFamily: '"BpmfZihiSerif", Georgia, "Noto Serif TC", serif' }

export default function KidsZonePage() {
  const location = useLocation()
  const hash = location.hash.slice(1)

  // 什麼是表意權 — 故事書
  if (hash === 'intro') {
    return <StoryBook />
  }

  // 捷運大富翁
  if (hash === 'metro') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10" style={kidsFont}>
        <Link
          to="/kids"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回兒少專區
        </Link>
        <div style={{ zoom: 1.2 }}>
          <MetroGame />
        </div>
      </div>
    )
  }

  // 我是神槍手
  if (hash === 'shooter') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10" style={kidsFont}>
        <Link
          to="/kids"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回兒少專區
        </Link>
        <div style={{ zoom: 1.2 }}>
          <BalloonShooter />
        </div>
      </div>
    )
  }

  // 翻翻樂配對遊戲
  if (hash === 'cards') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10" style={kidsFont}>
        <Link
          to="/kids"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回兒少專區
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          配對小達人｜挑戰賽
        </h1>
        <MatchingGame />
      </div>
    )
  }

  // ===== Index view =====
  return (
    <div className="max-w-4xl mx-auto px-4 py-10" style={kidsFont}>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tag-red/10 text-tag-red dark:text-tag-orange text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          給兒童和青少年的專區
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          兒少友善教材
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          用你看得懂的方式，認識屬於你的權利
        </p>
      </div>

      {/* 故事 */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-primary-500 dark:text-primary-400 tracking-wider mb-3 pl-1">📖 故事</h3>
        <div className="grid grid-cols-1 gap-4">
          <Link
            to="/kids#intro"
            className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow flex items-center gap-5"
          >
            <span className="text-4xl flex-shrink-0">📖</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">《被忘記的小聲音》</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">用故事認識什麼是「表意權」</p>
            </div>
          </Link>
        </div>
      </div>

      {/* 遊戲 */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-primary-500 dark:text-primary-400 tracking-wider mb-3 pl-1">🎮 遊戲</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            to="/kids#metro"
            className="block bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-slate-800 rounded-2xl border border-red-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">🚇</span>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">捷運大富翁</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">搭捷運學表意權，答對就前進！</p>
          </Link>

          <Link
            to="/kids#shooter"
            className="block bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-slate-800 rounded-2xl border border-sky-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">🎯</span>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">我是神槍手</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">射中正確的氣球，分三種難度！</p>
          </Link>

          <Link
            to="/kids#cards"
            className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">🃏</span>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">配對小達人</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">翻牌找一樣的，挑戰你的記憶力！</p>
          </Link>
        </div>
      </div>

      {/* 測驗 */}
      <div>
        <h3 className="text-sm font-bold text-primary-500 dark:text-primary-400 tracking-wider mb-3 pl-1">📝 測驗</h3>
        <div className="grid grid-cols-1 gap-4">
          <Link
            to="/quiz"
            className="block bg-gradient-to-br from-tag-orange/10 to-tag-red/10 rounded-2xl border border-tag-orange/20 p-6 hover:shadow-md transition-shadow flex items-center gap-5"
          >
            <span className="text-4xl flex-shrink-0">🧠</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">情境大考驗</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">10 個情境題，測測你的理解</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ═══════ 故事書元件 ═══════ */

const storyPages = [
  {
    illust: () => <img src="/story-cover.png" alt="被忘記的小聲音" className="w-full h-full object-cover" />,
    bg: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-slate-800',
    title: '被忘記的小聲音',
    text: '一個關於「被聽見」的故事',
    isCover: true,
  },
  {
    illust: () => <img src="/story-forest.jpg" alt="熱鬧的森林" className="w-full h-full object-cover" />,
    bg: 'from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-slate-800',
    title: '熱鬧的森林',
    text: '在一座大森林裡，住著各種動物。每當有重要的事要決定，大家就會在「大橡樹廣場」開會。不過，來開會的總是那些大動物——熊村長、鹿老師、老鷹警長。小動物們？沒有人覺得需要邀請他們。',
  },
  {
    illust: () => <img src="/story-bridge.jpg" alt="蓋一座新橋" className="w-full h-full object-cover" />,
    bg: 'from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-slate-800',
    title: '蓋一座新橋',
    text: '這天，熊村長在大會上宣布：「我們要在河的東邊蓋一座新的大橋！」鹿老師點點頭：「很好，這樣大家過河就方便了。」老鷹警長也同意：「我從天上看過了，那個位置看起來不錯。」三個人拍拍手，決定就這麼辦。',
  },
  {
    illust: () => <img src="/story-rabbit.jpg" alt="小兔子的發現" className="w-full h-full object-cover" />,
    bg: 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-slate-800',
    title: '小兔子的發現',
    text: '小兔子琪琪住在河邊，她每天都會沿著河岸散步。她知道一件大動物們不知道的事——河東邊的土地非常鬆軟，一到雨季就會變成泥巴地，根本撐不住一座橋。而且她發現河的西邊有一段比較窄的地方，在那裡蓋橋更短、更穩、也更安全。琪琪好想告訴大家，但是……她只是一隻小兔子啊。',
  },
  {
    illust: IllustSad,
    bg: 'from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-800',
    title: '沒有人問我',
    text: '琪琪跑到大橡樹廣場，想要告訴熊村長她知道的事。「村長！那個地方的土——」「琪琪啊，大人在開會喔，小朋友先回去玩吧。」熊村長摸摸她的頭，笑著說。琪琪低下頭，慢慢走回家。她覺得好難過，明明她知道很重要的事情，卻沒有人願意聽。',
  },
  {
    illust: () => <img src="/story-friends.jpg" alt="不只琪琪" className="w-full h-full object-cover" />,
    bg: 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-slate-800',
    title: '不只琪琪',
    text: '琪琪回到家，發現松鼠小胖和青蛙阿綠也在嘆氣。小胖說：「他們要砍掉我住的那棵樹來做木材，但那棵樹上有好多鳥巢……」阿綠說：「新的橋會擋住水流，我們青蛙的池塘可能會乾掉……」原來，不只琪琪——很多小動物都有想法，但從來沒有人問過他們。',
  },
  {
    illust: () => <img src="/story-owl.png" alt="貓頭鷹奶奶的話" className="w-full h-full object-cover" />,
    bg: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-slate-800',
    title: '貓頭鷹奶奶的話',
    text: '他們一起去找了森林裡最聰明的貓頭鷹奶奶。奶奶聽完後說：「你們知道嗎？在人類的世界裡，有一個大部分國家都同意的約定，叫做『兒童權利公約』。裡面有一條很重要的規定——跟你有關的事情，大人和小孩可以一起想辦法。小孩的想法很重要，因為大人跟小孩看事情的角度有時候不一樣。這叫做『表意權』。」',
  },
  {
    illust: () => <img src="/story-brave.png" alt="勇敢說出來" className="w-full h-full object-cover" />,
    bg: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-slate-800',
    title: '勇敢說出來',
    text: '琪琪深吸一口氣，帶著小胖和阿綠一起回到大橡樹廣場。「村長，可以給我們五分鐘嗎？」這次琪琪的聲音沒有在發抖。她把河東邊土地鬆軟的事告訴了大家，還建議改到西邊比較窄的地方蓋橋。小胖說了鳥巢的事，阿綠說了池塘的事。她們不是在搗亂，她們是在分享「只有住在那裡的小動物才知道的事」。',
  },
  {
    illust: () => <img src="/story-surprise.png" alt="大家嚇了一跳" className="w-full h-full object-cover" />,
    bg: 'from-red-50 to-orange-50 dark:from-red-950/30 dark:to-slate-800',
    title: '大家嚇了一跳',
    text: '熊村長聽完，愣住了。「天啊……我們差點犯了一個大錯。」鹿老師翻了翻資料：「琪琪說得沒錯，東邊的土層確實很不穩定，橋蓋在那裡遲早會塌。」老鷹警長不好意思地搔搔頭：「我從天上只看得到地形，看不到土壤的問題啊……」他們這才發現——小動物每天走在地上看到的，大動物不一定看得到。',
  },
  {
    illust: () => <img src="/story-path.png" alt="新的決定" className="w-full h-full object-cover" />,
    bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-slate-800',
    title: '新的決定',
    text: '大家重新討論，最後決定把橋改蓋在琪琪建議的西邊——那裡河面窄、地基穩，橋蓋得又短又牢固，也不會影響到小胖的樹和阿綠的池塘。這個方案比原來的更好——因為聽了小動物的聲音。',
  },
  {
    illust: IllustChair,
    bg: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-slate-800',
    title: '多一張小椅子',
    text: '從那天起，大橡樹廣場的會議桌旁，多了幾張小椅子。每次開會，小動物們都會被邀請參加。不是每次都要發言，但只要他們想說，就會有人認真聽。熊村長在會議桌上掛了一塊小牌子，上面寫著：「每個聲音都很重要——不管你幾歲。」',
  },
  {
    illust: IllustEnd,
    bg: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-slate-800',
    title: '回到你身上',
    text: '這個故事說的，就是「表意權」。你有權利說出自己的想法，而且大人要認真聽。不管是在學校、在家裡、還是跟你有關的任何決定——你的經驗和感受，都是很重要的。就像琪琪一樣，有時候只有你才知道的事情，可能會改變整個決定。不要害怕開口，你的聲音值得被聽見。',
    isEnd: true,
  },
]

// 預載所有故事圖片，避免翻頁時閃爍
const storyImageUrls = ['/story-cover.png', '/story-forest.jpg', '/story-bridge.jpg', '/story-rabbit.jpg', '/story-friends.jpg', '/story-owl.png', '/story-brave.png', '/story-surprise.png', '/story-path.png']
storyImageUrls.forEach(src => { const img = new Image(); img.src = src })

function StoryBook() {
  const [page, setPage] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [flipDir, setFlipDir] = useState(null)
  const [outPage, setOutPage] = useState(null) // 正在翻走的舊頁
  const total = storyPages.length
  const current = storyPages[page]
  const Illust = current.illust
  const bookFont = { fontFamily: '"BpmfZihiSerif", Georgia, "Noto Serif TC", serif' }

  function playPageTurn() {
    const s = new Audio('/page-turn.mp3')
    s.volume = 0.5
    s.currentTime = 2
    s.play().catch(() => {})
  }

  function goPage(n) {
    if (n < 0 || n >= total || n === page || flipping) return
    playPageTurn()
    const dir = n > page ? 'next' : 'prev'
    setFlipDir(dir)
    setFlipping(true)

    if (dir === 'next') {
      setOutPage(page)
      setPage(n)  // 新頁立刻在底下
      setTimeout(() => {
        setOutPage(null)
        setFlipping(false)
      }, 700)
    } else {
      setPage(n)
      setTimeout(() => setFlipping(false), 700)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        to="/kids"
        className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回兒少專區
      </Link>

      {/* 書本 */}
      <div className="book-perspective">
        {/* 書本底部陰影+厚度層疊 */}
        <div className="relative">
          {/* 頁面厚度——疊在書後面的假頁 */}
          <div className="hidden md:block absolute -bottom-1 left-3 right-3 h-full rounded-2xl bg-[#e8e0d2] dark:bg-slate-700 border border-[#d4c9b8] dark:border-slate-600" />
          <div className="hidden md:block absolute -bottom-2 left-5 right-5 h-full rounded-2xl bg-[#ddd5c6] dark:bg-slate-600 border border-[#ccc2b0] dark:border-slate-500" />

          {/* 書本主體 */}
          <div className="relative bg-[#f8f4ed] dark:bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden min-h-[420px] md:min-h-[480px]"
            style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)' }}
          >
            {/* 書脊（左側深色條） */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 z-10"
              style={{
                background: 'linear-gradient(to right, #c4b5a0, #d9ccb8 40%, transparent)',
                borderRight: '1px solid #c4b5a0',
              }}
            />
            {/* 中線書脊 */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px z-10"
              style={{ background: 'linear-gradient(to bottom, transparent, #c4b5a0 15%, #c4b5a0 85%, transparent)' }}
            />

            {/* 翻走的舊頁 */}
            {outPage !== null && (() => {
              const old = storyPages[outPage]
              const OldIllust = old.illust
              return (
                <div className="absolute inset-0 z-20 page-flip-next-out bg-[#f8f4ed] dark:bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden">
                  {old.isCover ? (
                    <div className="flex flex-col md:flex-row min-h-[420px] md:min-h-[480px]">
                      <div className="relative md:w-1/2 bg-[#f0ebe0] dark:bg-slate-750 border-b md:border-b-0">
                        <OldIllust />
                      </div>
                      <div className="md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2" style={bookFont}>{old.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-4" style={bookFont}>{old.text}</p>
                        <span className="text-[10px] text-gray-500/70 dark:text-gray-400/60 mt-4" style={bookFont}>小畫家：潘敏菁、陳閎凱、田羽妡</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row min-h-[420px] md:min-h-[480px]">
                      <div className="relative md:w-1/2 flex items-center justify-center bg-[#f0ebe0] dark:bg-slate-750 p-6 md:p-8 md:pl-12">
                        <OldIllust />
                        {old.credit && (
                          <span className="absolute bottom-2 right-4 text-[10px] text-gray-500/70 dark:text-gray-400/60" style={bookFont}>{old.credit}</span>
                        )}
                      </div>
                      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-10">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4" style={bookFont}>{old.title}</h2>
                        <p className="text-[15px] md:text-base text-gray-700 dark:text-gray-300 leading-[1.95]" style={bookFont}>{old.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* 當前頁面 */}
            {current.isCover ? (
              <div className={`flex flex-col md:flex-row min-h-[420px] md:min-h-[480px] ${flipDir === 'prev' ? 'page-flip-prev-in' : ''}`}>
                <div className="relative md:w-1/2 bg-[#f0ebe0] dark:bg-slate-750 border-b md:border-b-0">
                  <Illust />
                </div>
                <div className="md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2" style={bookFont}>{current.title}</h1>
                  <p className="text-gray-500 dark:text-gray-400 mb-4" style={bookFont}>{current.text}</p>
                  <span className="text-[10px] text-gray-500/70 dark:text-gray-400/60 mt-4" style={bookFont}>小畫家：潘敏菁、陳閎凱、田羽妡</span>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">點下方箭頭開始閱讀 →</p>
                </div>
              </div>
            ) : (
              <div className={`flex flex-col md:flex-row min-h-[420px] md:min-h-[480px] ${flipDir === 'prev' ? 'page-flip-prev-in' : ''}`}>
                {/* 左頁：插圖 */}
                <div className="relative md:w-1/2 flex items-center justify-center bg-[#f0ebe0] dark:bg-slate-750 p-6 md:p-8 md:pl-12 border-b md:border-b-0">
                  <Illust />
                  {current.credit && (
                    <span className="absolute bottom-2 right-4 text-[10px] text-gray-500/70 dark:text-gray-400/60" style={bookFont}>{current.credit}</span>
                  )}
                </div>

                {/* 右頁：文字 */}
                <div className="relative md:w-1/2 flex flex-col justify-center p-6 md:p-10">
                  {/* 頁碼角 */}
                  <span className="absolute top-3 right-4 text-[10px] text-[#b5a898] dark:text-slate-500" style={bookFont}>— {page + 1} —</span>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4" style={bookFont}>
                    {current.title}
                  </h2>
                  <p className="text-[15px] md:text-base text-gray-700 dark:text-gray-300 leading-[1.95]" style={bookFont}>
                    {current.text}
                  </p>
                  {current.isEnd && (
                    <div className="mt-8 text-center">
                      <Link
                        to="/kids"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium text-sm transition-colors"
                      >
                        返回兒少專區
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 翻頁控制 */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => goPage(page - 1)}
          disabled={page === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-700"
        >
          <ChevronLeft className="w-4 h-4" />
          上一頁
        </button>

        {/* 頁碼圓點 */}
        <div className="flex gap-1.5">
          {storyPages.map((_, i) => (
            <button
              key={i}
              onClick={() => goPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === page
                  ? 'bg-primary-600 w-5'
                  : 'bg-primary-300 dark:bg-slate-600 hover:bg-primary-400'
              }`}
              aria-label={`第 ${i + 1} 頁`}
            />
          ))}
        </div>

        <button
          onClick={() => goPage(page + 1)}
          disabled={page === total - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-700"
        >
          下一頁
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 頁碼 */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
        {page + 1} / {total}
      </p>
    </div>
  )
}
