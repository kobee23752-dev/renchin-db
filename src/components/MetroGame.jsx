import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/* ═══ 站點資料（淡水信義線：北投→象山）═══ */
const STATIONS = [
  '北投', '奇岩', '唭哩岸', '石牌', '明德', '芝山', '士林',
  '劍潭', '圓山', '民權西路', '雙連', '中山', '台北車站',
  '台大醫院', '中正紀念堂', '東門', '大安森林公園', '大安',
  '信義安和', '台北101/世貿', '象山',
]

/* ═══ 任務情境卡（開局抽一張，決定目標站）═══ */
const MISSION_CARDS = [
  { emoji: '🧁', text: '東門站的永康街有超好吃的芒果冰！', targetStation: 15 },
  { emoji: '🍜', text: '聽說劍潭夜市的雞排超大塊，出發！', targetStation: 7 },
  { emoji: '🏫', text: '今天要去士林科教館看恐龍展！', targetStation: 6 },
  { emoji: '🎪', text: '圓山花博公園有假日市集，好想逛！', targetStation: 8 },
  { emoji: '🛍️', text: '媽媽說要去中山站地下街買文具！', targetStation: 11 },
  { emoji: '🍰', text: '雙連站附近有一家超好吃的蛋糕店！', targetStation: 10 },
  { emoji: '🚂', text: '全家約好在台北車站集合搭高鐵回阿嬤家！', targetStation: 12 },
  { emoji: '🌳', text: '大安森林公園的櫻花開了，去野餐吧！', targetStation: 16 },
  { emoji: '📚', text: '大安站附近有一間超棒的獨立書店！', targetStation: 17 },
  { emoji: '🎬', text: '信義安和站旁邊的電影院有新片上映！', targetStation: 18 },
  { emoji: '🏙️', text: '今天要去台北 101 觀景台看夜景！', targetStation: 19 },
  { emoji: '🏔️', text: '天氣超好，揪朋友去象山步道爬山！', targetStation: 20 },
  { emoji: '🎨', text: '芝山站附近有兒童美術教室的體驗課！', targetStation: 5 },
  { emoji: '🐟', text: '石牌站的早餐街有超好吃的蛋餅！', targetStation: 3 },
  { emoji: '🎸', text: '民權西路站有音樂教室的吉他體驗課！', targetStation: 9 },
  { emoji: '🧋', text: '東門站的珍珠奶茶排隊排超長，但值得！', targetStation: 15 },
  { emoji: '🎮', text: '朋友約你去台北車站附近的桌遊店玩！', targetStation: 12 },
  { emoji: '🌸', text: '明德站的公園有好多漂亮的花，去拍照！', targetStation: 4 },
]

/* ═══ 每回合的限時情境（答題用）═══ */
const ROUND_SCENARIOS = [
  { emoji: '⏰', text: '快遲到了！趕快回答！', time: 15 },
  { emoji: '🏃', text: '捷運快到站了，把握時間！', time: 15 },
  { emoji: '📢', text: '車廂廣播：下一站即將到達...', time: 15 },
  { emoji: '🎒', text: '書包好重，快回答就能上車了！', time: 15 },
  { emoji: '🌧️', text: '外面在下雨，趕快搭上捷運！', time: 15 },
  { emoji: '🔔', text: '叮咚～門要關了，快回答！', time: 15 },
  { emoji: '🗺️', text: '看看路線圖，還有幾站呢？', time: 15 },
  { emoji: '💪', text: '加油！你可以的！', time: 15 },
  { emoji: '🎵', text: '伴著進站音樂，繼續前進吧！', time: 15 },
  { emoji: '🚉', text: '月台上好多人在等車呢！', time: 15 },
]

/* ═══ 題庫（80 題）— 捷運大富翁專用，語氣溫和 ═══ */
const ALL_QUESTIONS = [
  // ── 基礎觀念 ──
  { q: '「表意權」用一句話來說是什麼？', a: '你可以說出自己的想法，而且會被認真聽', w: ['只有考試才需要回答', '等長大才能有想法', '要先問過大人才能說'] },
  { q: '表意權適用於幾歲？', a: '不限年齡，從小就有', w: ['12 歲以上', '上國中以後', '18 歲成年才有'] },
  { q: '選擇「不說話」算不算一種表達？', a: '算，沉默也是一種選擇', w: ['不算，一定要開口', '不算，要寫下來才行', '不算，要舉手才算'] },
  { q: '表達意見一定要用說的嗎？', a: '不一定，畫畫、寫字、演戲都可以', w: ['對，只能用嘴巴說', '對，要寫正式報告', '對，要舉手發言才算'] },
  { q: '哪個國際公約提到了兒童表意權？', a: '兒童權利公約（CRC）', w: ['日內瓦公約', '巴黎協定', '世界衛生組織憲章'] },
  { q: '兒童權利公約是哪一年通過的？', a: '1989 年', w: ['2000 年', '1776 年', '2020 年'] },
  { q: '表意權是在兒童權利公約的第幾條？', a: '第 12 條', w: ['第 1 條', '第 50 條', '第 100 條'] },
  { q: '大部分國家都同意兒童有表意權嗎？', a: '是的，大部分國家都簽署了 CRC', w: ['只有少數國家同意', '沒有國家同意', '只有台灣同意'] },
  { q: '台灣有把兒童權利公約變成法律嗎？', a: '有，叫做 CRC 施行法', w: ['沒有', '只是參考用', '還在討論中'] },
  { q: '表達意見跟「吵架」一樣嗎？', a: '不一樣，表達意見是用尊重的方式分享想法', w: ['一樣，都是在說自己的意見', '差不多', '表達意見就是跟大人爭辯'] },
  // ── 學校生活 ──
  { q: '班會要決定園遊會主題，最好的方式是？', a: '大家一起討論，再投票決定', w: ['班長自己決定就好', '用抽籤的比較快', '老師直接指定'] },
  { q: '學校要決定畢業旅行去哪，怎麼做比較好？', a: '讓同學們提案討論，一起選出來', w: ['校長決定就好', '家長投票就好', '去年去哪今年就去哪'] },
  { q: '你覺得學校午餐可以更好吃，可以怎麼做？', a: '跟老師或營養師分享你的想法', w: ['忍耐就好不要說', '自己帶便當算了', '午餐不重要'] },
  { q: '同學在班會上不太敢發言，可以怎麼幫忙？', a: '建議大家用紙條寫下想法，不一定要舉手', w: ['不關我的事', '叫他大聲一點', '幫他決定就好'] },
  { q: '老師問你的看法，但你還沒想好，怎麼辦？', a: '跟老師說「我需要想一下」', w: ['隨便說一個', '說不知道就好', '假裝沒聽到'] },
  { q: '班上要選班歌，最好的方式是？', a: '每個人都可以推薦，大家一起投票', w: ['班長直接選', '音樂課老師決定', '用猜拳'] },
  { q: '你有一個很棒的點子，但怕別人覺得奇怪，怎麼辦？', a: '試著說出來，不同的想法很有價值', w: ['算了不要說', '等別人先提一樣的', '只跟好朋友說'] },
  { q: '你想學烏克麗麗但學校沒有這個社團，可以怎麼做？', a: '跟老師提議看看能不能開新社團', w: ['放棄算了', '只能選現有的', '社團不重要'] },
  { q: '學校要設計新的遊樂設施，最棒的做法是？', a: '邀請同學一起參與討論和設計', w: ['大人設計就好', '照舊的蓋一樣', '不需要遊樂設施'] },
  { q: '上課時有問題想問，但怕打斷老師，可以怎麼做？', a: '先舉手，等老師注意到再問', w: ['不要問了', '下課再說算了', '直接大聲問'] },
  // ── 家庭日常 ──
  { q: '週末全家要一起出去玩，最好的決定方式是？', a: '大家一起討論，找到每個人都OK的方案', w: ['爸媽決定就好', '誰最大聲聽誰的', '每次都去同一個地方'] },
  { q: '家裡要重新佈置你的房間，你可以參與嗎？', a: '當然可以，這是你的空間', w: ['小孩不懂佈置', '大人決定比較好', '等長大再說'] },
  { q: '爸媽要幫你轉學，比較好的做法是？', a: '跟你一起聊聊，聽聽你的想法', w: ['直接決定就好', '搬完再告訴你', '不用問小孩'] },
  { q: '家裡在討論養寵物的事，你可以表達意見嗎？', a: '可以，這是全家人的事，你的想法很重要', w: ['小孩不能決定', '大人說不行就不行', '不用問小孩'] },
  { q: '你不喜歡媽媽幫你選的衣服，可以怎麼說？', a: '溫和地告訴媽媽你喜歡什麼風格', w: ['不說，穿就對了', '直接生氣', '不能有意見'] },
  { q: '爸爸煮了你不愛吃的菜，怎麼溝通比較好？', a: '謝謝爸爸煮飯，也分享你喜歡吃什麼', w: ['直接不吃', '發脾氣', '什麼都不說'] },
  // ── 朋友與人際 ──
  { q: '朋友不小心弄壞你的東西，你可以怎麼表達？', a: '告訴他你的感受，一起想辦法解決', w: ['不說算了', '直接生氣', '再也不跟他玩'] },
  { q: '玩遊戲時大家意見不同，最好怎麼處理？', a: '聽聽每個人的想法，找到大家都接受的方式', w: ['誰最大聲聽誰的', '不玩了', '多數決就好不用討論'] },
  { q: '你看到同學被欺負，但不確定要不要說，怎麼辦？', a: '可以先告訴你信任的老師', w: ['不關我的事', '自己去處理', '假裝沒看到'] },
  { q: '跟朋友吵架了，怎麼樣可以好好溝通？', a: '等雙方冷靜後，說說各自的感受', w: ['不理他就好', '找其他人評理', '吵贏就好'] },
  // ── 社區與公共事務 ──
  { q: '社區的公園要改建，住附近的你可以怎麼做？', a: '跟家人一起去社區會議分享想法', w: ['小朋友管不了', '算了不要管', '只能接受'] },
  { q: '你覺得上學路上不太安全，可以怎麼做？', a: '跟家長或老師反映，一起想解決方法', w: ['自己小心就好', '不用說', '沒辦法改變'] },
  { q: '圖書館在選新的兒童書，最好的做法是？', a: '讓小朋友也可以推薦想看的書', w: ['館長自己選就好', '只買排行榜的書', '小孩不知道什麼書好'] },
  { q: '你覺得社區應該有更多兒童遊戲空間，可以怎麼做？', a: '寫信或畫圖跟里長建議', w: ['小孩不能建議', '等長大再說', '沒有用的'] },
  { q: '社區要辦活動，你有好點子，可以跟誰說？', a: '跟爸媽說，請他們幫你轉達給里長', w: ['小孩的點子不會被採用', '等長大再說', '不用說了'] },
  // ── 捷運情境 ──
  { q: '捷運站的指標對小朋友不太清楚，可以怎麼做？', a: '畫圖或寫信跟捷運公司分享你的建議', w: ['忍耐就好', '不關小孩的事', '長大再說'] },
  { q: '如果捷運公司請小朋友幫忙設計車站佈置，這代表什麼？', a: '他們覺得小朋友的想法和創意很棒', w: ['只是在做廣告', '小朋友不會設計', '在開玩笑'] },
  { q: '搭捷運時你想讓座給需要的人，這跟表意權有關嗎？', a: '有關，因為你在用行動表達你的善意', w: ['完全無關', '只有說話才算', '讓座不算表達'] },
  { q: '捷運上看到一幅關於兒童權利的海報，你會怎麼做？', a: '看看內容，回去跟朋友分享', w: ['不理它', '海報不重要', '只有大人才需要看'] },
  // ── 表意權觀念（溫和版） ──
  { q: '大人做了一個決定但你有不同想法，最好的方式是？', a: '找適當的時機，好好跟大人說你的想法', w: ['直接反對', '生悶氣', '什麼都不說'] },
  { q: '大人聽了你的意見但最後有不同的決定，他應該怎麼做？', a: '讓你知道他怎麼考量的，為什麼這樣決定', w: ['不用解釋', '直接決定就好', '不需要告訴小孩'] },
  { q: '「回饋」在表意權裡是什麼意思？', a: '讓你知道你的意見被怎麼處理了', w: ['給你獎勵', '稱讚你很乖', '讓你出去玩'] },
  { q: '什麼是「兒少代表」？', a: '代表兒童和青少年一起參與討論公共事務的人', w: ['幫老師做事的人', '管秩序的人', '負責打掃的人'] },
  { q: '大人跟小孩的看法不一樣時，怎麼辦最好？', a: '互相聽對方的想法，一起找到好的方法', w: ['大人說的一定對', '小孩要聽話', '吵一架看誰贏'] },
  { q: '「有意義的參與」是什麼意思？', a: '你的意見真的被聽見，也影響了最後的決定', w: ['出席就好', '簽名就算', '拍照打卡'] },
  { q: '為什麼大人跟小孩一起討論很重要？', a: '因為不同角度看事情，可以找到更好的答案', w: ['大人需要小孩幫忙', '小孩要學大人怎麼決定', '只是為了做做樣子'] },
  { q: '表達意見之前，可以先做什麼準備？', a: '想清楚自己的想法，也了解一下相關的資訊', w: ['不用準備直接說', '讓大人幫你準備', '不用想直接照做'] },
  // ── 更多日常情境 ──
  { q: '營養午餐的菜單你覺得可以改善，怎麼做？', a: '跟班導師或午餐委員分享你的建議', w: ['忍耐不要說', '自己帶飯就好', '營養的東西不好吃很正常'] },
  { q: '學校的打掃分配你覺得不太公平，可以怎麼做？', a: '在班會上提出來跟大家討論', w: ['算了不要計較', '直接不打掃', '跟老師告狀'] },
  { q: '你想參加校外的才藝課，但爸媽不確定，怎麼溝通？', a: '告訴他們你為什麼想學，一起評估看看', w: ['生氣吵鬧', '放棄不提了', '偷偷去報名'] },
  { q: '大掃除時你有更好的分工方式，可以怎麼提出？', a: '跟組長或老師說「我有一個想法可以試試看」', w: ['不要多管閒事', '照原本的做就好', '自己偷偷換'] },
  { q: '朋友生日派對的活動你有好點子，可以怎麼做？', a: '跟朋友分享你的想法，一起討論', w: ['不要說免得被拒絕', '等別人先提', '不關你的事'] },
  { q: '家裡在討論暑假要做什麼，你可以提出想法嗎？', a: '當然可以，暑假計畫跟你很有關', w: ['大人安排就好', '小孩沒有決定權', '等通知就好'] },
  // ── 情緒與感受 ──
  { q: '覺得自己的想法可能不夠好，還要說出來嗎？', a: '可以說，每個人的想法都有它的價值', w: ['不要說了', '想法不好就不要講', '等想到完美的再說'] },
  { q: '跟大人說話會緊張，可以怎麼辦？', a: '先寫下來或跟信任的人練習', w: ['那就不要說了', '緊張就表示不該說', '等不緊張再說'] },
  { q: '你表達了意見但沒被採用，會覺得難過，怎麼想比較好？', a: '被聽見本身就很棒，不是每次都要被採用', w: ['以後都不要說了', '大人根本不在乎', '說了也沒用'] },
  { q: '同學嘲笑你的意見，你可以怎麼做？', a: '告訴他你不喜歡被嘲笑，每個人的想法都該被尊重', w: ['以後都不說了', '嘲笑回去', '假裝不在意'] },
  // ── 權利知識 ──
  { q: '「Lundy 模型」跟什麼有關？', a: '兒童參與的四個重要面向', w: ['一種數學公式', '天氣預報方法', '運動訓練計畫'] },
  { q: '台灣的兒少代表制度大約是什麼時候全面實施？', a: '大約 2018 年前後', w: ['1990 年', '2005 年', '還沒有全面實施'] },
  { q: '兒童權利公約有幾大原則？', a: '四大原則', w: ['一個', '兩個', '十個'] },
  { q: '表意權是兒童權利公約四大原則之一嗎？', a: '是的', w: ['不是', '只是附帶條文', '跟原則無關'] },
  { q: '「參與」在兒童權利裡是什麼意思？', a: '你能真正參與跟自己有關的討論和決定', w: ['坐在旁邊看就好', '聽大人說就好', '簽到就算參與'] },
  // ── 生活趣味題 ──
  { q: '如果你可以設計一間理想的教室，你覺得最重要的是？', a: '學生也能一起參與決定教室的樣子', w: ['越大越好', '要有冷氣就好', '跟現在一樣就好'] },
  { q: '如果市長問你「小朋友最需要什麼？」你會怎麼回答？', a: '分享你真正的想法，因為你最了解自己的需要', w: ['說不知道', '問爸媽再回答', '市長不會問小孩'] },
  { q: '如果動物園要新增一種動物，你覺得該問誰的意見？', a: '大人和小朋友的意見都值得參考', w: ['只問園長', '只問動物專家', '不用問任何人'] },
  { q: '如果你是一日校長，你會做的第一件事是？', a: '問問同學們覺得學校可以怎麼更好', w: ['放大家一天假', '改校規讓大家都聽我的', '什麼都不做'] },
  { q: '你覺得「好的傾聽」包括什麼？', a: '認真看著對方，不打斷，聽完再回應', w: ['聽到就好', '一邊滑手機一邊聽', '趕快打斷然後回答'] },
  { q: '你覺得為什麼有些大人不太習慣聽小孩的想法？', a: '可能過去沒有這樣的經驗，需要慢慢學習', w: ['因為小孩說的都不對', '大人比較厲害', '小孩本來就不用發言'] },
  { q: '「每個人的聲音都很重要」這句話是什麼意思？', a: '不管年齡大小，每個人的想法都值得被聽見', w: ['只是安慰的話', '大人說的比較重要', '只在學校才適用'] },
  { q: '如果全班要一起做一件事，最好的開始方式是？', a: '先聽聽每個人的想法，再一起做決定', w: ['老師指定就好', '班長決定', '不用討論直接做'] },
  { q: '你覺得什麼樣的環境最容易讓人說出心裡話？', a: '感覺安全、被尊重、不怕被笑的地方', w: ['很安靜的地方', '有很多人的地方', '考試的時候'] },
  { q: '表達意見最重要的是什麼？', a: '真誠地說出自己的想法，也尊重別人', w: ['說得越大聲越好', '一定要贏過別人', '說得越多越好'] },
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

/* ═══ 捷運路線圖 ═══ */
function MrtMap({ position }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-station="${position}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [position])

  return (
    <div ref={scrollRef} className="overflow-x-auto pb-2 -mx-2 px-2">
      <div className="flex items-end gap-0 min-w-[750px] relative py-6 px-4">
        {/* 紅線 */}
        <div className="absolute top-[32px] left-4 right-4 h-1.5 bg-red-400 rounded-full" />

        {STATIONS.map((name, i) => {
          const isCurrent = i === position
          const isVisited = i <= position

          return (
            <div
              key={i}
              data-station={i}
              className="flex flex-col items-center relative"
              style={{ flex: '1 0 0' }}
            >
              {/* 列車 emoji */}
              {isCurrent && (
                <div className="absolute -top-8 animate-bounce text-2xl">🚃</div>
              )}

              {/* 站點圓點 */}
              <div className={`w-5 h-5 rounded-full border-2 z-10 transition-all duration-700 ${
                isCurrent
                  ? 'bg-red-500 border-red-500 ring-4 ring-red-200 scale-125'
                  : isVisited
                  ? 'bg-red-500 border-red-500'
                  : 'bg-white border-gray-300'
              }`} />

              {/* 站名 */}
              <span className={`text-[10px] md:text-xs mt-2 whitespace-nowrap leading-tight text-center ${
                isCurrent ? 'font-bold text-red-600' : isVisited ? 'text-red-400' : 'text-gray-400'
              }`}>
                {name.length > 3 ? name.slice(0, 3) : name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══ 骰子 ═══ */
function DiceDisplay({ value, rolling }) {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!rolling) return
    const interval = setInterval(() => {
      setDisplay(Math.floor(Math.random() * 6))
    }, 80)
    return () => clearInterval(interval)
  }, [rolling])

  const shown = rolling ? display : (value ? value - 1 : 0)

  return (
    <div className="text-center py-4">
      <div className={`text-8xl md:text-9xl ${rolling ? 'animate-spin' : ''}`} style={{ animationDuration: '0.3s' }}>
        {faces[shown]}
      </div>
      {!rolling && value && (
        <p className="text-2xl font-bold text-red-600 mt-4">前進 {value} 站！</p>
      )}
    </div>
  )
}

/* ═══ 主元件 ═══ */
export default function MetroGame() {
  const [phase, setPhase] = useState('menu')       // menu | mission | playing | result
  const [roundPhase, setRoundPhase] = useState('scenario')
  const [mission, setMission] = useState(null)     // 任務卡
  const [targetStation, setTargetStation] = useState(20)
  const [position, setPosition] = useState(0)
  const [round, setRound] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalWrong, setTotalWrong] = useState(0)
  const [currentScenario, setCurrentScenario] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [diceValue, setDiceValue] = useState(null)
  const [diceRolling, setDiceRolling] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [timeLimit, setTimeLimit] = useState(0)

  const timerRef = useRef(null)
  const bgmRef = useRef(null)
  const lockRef = useRef(false)
  const questionsRef = useRef([])
  const scenariosRef = useRef([])
  const qIndexRef = useRef(0)
  const sIndexRef = useRef(0)

  // BGM
  useEffect(() => {
    const a = new Audio('/metro-bgm.mp3')
    a.loop = true; a.volume = 0.3
    bgmRef.current = a
    return () => { a.pause(); a.src = '' }
  }, [])
  function startBgm() {
    const a = bgmRef.current
    if (!a) return
    a.currentTime = 62
    a.volume = 0.15  // 平時小聲
    a.play().catch(() => {})
    const onTime = () => { if (a.currentTime >= 93) a.currentTime = 62 }
    a.addEventListener('timeupdate', onTime)
    a._onTime = onTime
  }
  function bgmLoud() { if (bgmRef.current) bgmRef.current.volume = 0.4 }
  function bgmQuiet() { if (bgmRef.current) bgmRef.current.volume = 0.15 }
  function stopBgm() {
    const a = bgmRef.current
    if (!a) return
    a.pause(); a.currentTime = 0
    if (a._onTime) { a.removeEventListener('timeupdate', a._onTime); a._onTime = null }
  }
  function playSfx(url, vol = 0.6) { const s = new Audio(url); s.volume = vol; s.play().catch(() => {}) }

  function clearTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }
  useEffect(() => () => { clearTimer(); stopBgm() }, [])

  // 下一題
  function nextRound(pos) {
    clearTimer()
    lockRef.current = false
    setSelectedAnswer(null)
    setIsCorrect(null)
    setDiceValue(null)
    setDiceRolling(false)

    // 取情境
    if (sIndexRef.current >= scenariosRef.current.length) {
      scenariosRef.current = shuffle(ROUND_SCENARIOS)
      sIndexRef.current = 0
    }
    const scenario = scenariosRef.current[sIndexRef.current++]
    setCurrentScenario(scenario)
    setTimeLimit(scenario.time)
    setTimeLeft(scenario.time)

    // 取題目
    if (qIndexRef.current >= questionsRef.current.length) {
      questionsRef.current = shuffle(ALL_QUESTIONS)
      qIndexRef.current = 0
    }
    const question = questionsRef.current[qIndexRef.current++]
    setCurrentQuestion(question)
    setOptions(shuffle([question.a, ...question.w]))

    setRound(r => r + 1)
    setRoundPhase('scenario')

    // 顯示情境 2 秒後進入作答
    setTimeout(() => {
      setRoundPhase('question')
      // 啟動計時
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            // 時間到 = 答錯
            clearTimer()
            handleTimeout(pos)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }, 2000)
  }

  function handleTimeout(pos) {
    if (lockRef.current) return
    lockRef.current = true
    playSfx('/wrong-sfx.mp3')
    setIsCorrect(false)
    setTotalWrong(w => w + 1)
    setRoundPhase('feedback')

    const newPos = Math.max(0, pos - 1)
    setTimeout(() => {
      setPosition(newPos)
      setRoundPhase('moving')
      setTimeout(() => nextRound(newPos), 1200)
    }, 1500)
  }

  function handleAnswer(answer) {
    if (lockRef.current || roundPhase !== 'question') return
    lockRef.current = true
    clearTimer()
    setSelectedAnswer(answer)

    const correct = answer === currentQuestion.a
    setIsCorrect(correct)

    if (correct) {
      setTotalCorrect(c => c + 1)
      setRoundPhase('feedback')

      // 擲骰子
      setTimeout(() => {
        setRoundPhase('dice')
        setDiceRolling(true)

        const dice = Math.floor(Math.random() * 6) + 1
        setTimeout(() => {
          setDiceRolling(false)
          setDiceValue(dice)

          const finalPos = Math.min(targetStation, position + dice)

          // 一站一站慢慢前進
          setTimeout(() => {
            setRoundPhase('moving')
            bgmLoud()
            let current = position
            const stepInterval = setInterval(() => {
              current += 1
              if (current > finalPos) {
                clearInterval(stepInterval)
                bgmQuiet()
                setTimeout(() => {
                  if (finalPos >= targetStation) {
                    stopBgm()
                    playSfx('/cheer-sfx.mp3', 0.25)
                    setPhase('result')
                  } else {
                    nextRound(finalPos)
                  }
                }, 800)
                return
              }
              setPosition(current)
            }, 600)
          }, 800)
        }, 1500)
      }, 1000)
    } else {
      playSfx('/wrong-sfx.mp3')
      setTotalWrong(w => w + 1)
      setRoundPhase('feedback')

      const newPos = Math.max(0, position - 1)
      setTimeout(() => {
        setPosition(newPos)
        setRoundPhase('moving')
        setTimeout(() => nextRound(newPos), 1200)
      }, 1500)
    }
  }

  function drawMission() {
    const card = MISSION_CARDS[Math.floor(Math.random() * MISSION_CARDS.length)]
    setMission(card)
    setTargetStation(card.targetStation)
    setPosition(0)
    setRound(0)
    setTotalCorrect(0)
    setTotalWrong(0)
    setPhase('mission')
  }

  function startPlaying() {
    // 多洗幾次確保每局順序不同
    questionsRef.current = shuffle(shuffle(ALL_QUESTIONS))
    scenariosRef.current = shuffle(shuffle(ROUND_SCENARIOS))
    qIndexRef.current = 0
    sIndexRef.current = 0
    setPhase('playing')
    startBgm()
    nextRound(0)
  }

  // ─── 選單 ───
  if (phase === 'menu') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🚇</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">捷運大富翁</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">搭捷運學表意權！從北投出發，目標是象山站！</p>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-5 text-left max-w-sm mx-auto mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-center">遊戲規則</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>🎯 答對題目 → 擲骰子（1-6），前進對應站數</li>
            <li>❌ 答錯或時間到 → 退後一站</li>
            <li>⏱ 每題有限時，要把握時間！</li>
            <li>🏁 抵達象山站就獲勝！</li>
          </ul>
        </div>

        <button
          onClick={drawMission}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-lg transition-colors"
        >
          🎴 抽任務卡
        </button>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
          遊戲備註：創意發想者：陳閎凱同學（北投國小四年級）
        </p>
      </div>
    )
  }

  // ─── 結算 ───
  // ─── 任務卡 ───
  if (phase === 'mission' && mission) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">你抽到的任務是...</p>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-slate-800 rounded-3xl border-2 border-red-300 dark:border-red-800 p-8 max-w-sm mx-auto mb-6 shadow-lg">
          <div className="text-5xl mb-4">{mission.emoji}</div>
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">{mission.text}</p>
          <div className="bg-white dark:bg-slate-700 rounded-xl p-3 mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">目標站</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              🚩 {STATIONS[mission.targetStation]}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              從北投出發，共 {mission.targetStation} 站
            </p>
          </div>
        </div>

        <button
          onClick={startPlaying}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-lg transition-colors"
        >
          🚃 出發！
        </button>

        <div className="mt-4">
          <button
            onClick={drawMission}
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
          >
            重新抽一張
          </button>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
          遊戲備註：創意發想者：陳閎凱同學（北投國小四年級）
        </p>
      </div>
    )
  }

  // ─── 結算 ───
  if (phase === 'result') {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          恭喜抵達{STATIONS[targetStation]}站！🎉
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
          共花了 <span className="font-bold text-red-500">{round}</span> 回合
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
          答對 {totalCorrect} 題 ／ 答錯 {totalWrong} 題
        </p>

        <MrtMap position={targetStation} />

        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={drawMission}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
          >
            再玩一次
          </button>
          <Link
            to="/kids"
            className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-700 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            返回兒少專區
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
          遊戲備註：創意發想者：陳閎凱同學（北投國小四年級）
        </p>
      </div>
    )
  }

  // ─── 遊戲中 ───
  const timerPercent = timeLimit > 0 ? (timeLeft / timeLimit) * 100 : 100
  const timerColor = timerPercent > 60 ? 'bg-green-500' : timerPercent > 30 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div>
      {/* 路線圖 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-3 mb-3">
        <MrtMap position={position} />
        <div className="flex items-center justify-between px-2 mt-1">
          <span className="text-xs text-gray-400">🚩 北投</span>
          <span className="text-xs font-bold text-red-500">目前：{STATIONS[position]}</span>
          <span className="text-xs text-gray-400">🏁 {STATIONS[targetStation]}</span>
        </div>
      </div>

      {/* 情境卡 */}
      {currentScenario && (
        <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-4 mb-3 border border-red-200 dark:border-red-900/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{currentScenario.emoji}</span>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{currentScenario.text}</p>
          </div>
          {/* 計時條 */}
          {roundPhase === 'question' && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${timerColor} ${timeLeft <= 5 ? 'animate-pulse' : ''}`}
                  style={{ width: `${timerPercent}%` }}
                />
              </div>
              <span className={`text-sm font-bold tabular-nums ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-500'}`}>
                {timeLeft}s
              </span>
            </div>
          )}
        </div>
      )}

      {/* 題目區 */}
      {(roundPhase === 'scenario') && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500 animate-pulse">
          準備好了嗎...
        </div>
      )}

      {(roundPhase === 'question' || roundPhase === 'feedback') && currentQuestion && (
        <div className="mb-3">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-3 border border-primary-200 dark:border-slate-700">
            <p className="text-center text-base font-bold text-gray-900 dark:text-white">
              {currentQuestion.q}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt, i) => {
              const isSelected = selectedAnswer === opt
              const isAnswer = opt === currentQuestion.a
              let btnClass = 'bg-white dark:bg-slate-800 border border-primary-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:shadow-md'

              if (roundPhase === 'feedback') {
                if (isAnswer) {
                  btnClass = 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300'
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300'
                } else {
                  btnClass = 'opacity-40 border border-gray-200 dark:border-slate-700 text-gray-400'
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  disabled={roundPhase === 'feedback'}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 回饋訊息 */}
      {roundPhase === 'feedback' && (
        <div className="text-center py-2">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {isCorrect ? '答對了！準備擲骰子 🎲' : `答錯了！退後一站 😢`}
          </span>
        </div>
      )}

      {/* 骰子 */}
      {roundPhase === 'dice' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 py-10 mb-3 shadow-sm">
          <DiceDisplay value={diceValue} rolling={diceRolling} />
        </div>
      )}

      {/* 移動中 */}
      {roundPhase === 'moving' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 py-10 mb-3 shadow-sm text-center">
          <div className="text-6xl mb-3 animate-bounce">🚃</div>
          <p className="text-xl font-bold text-red-500 animate-pulse">移動中...</p>
          <p className="text-sm text-gray-400 mt-1">{STATIONS[position]}</p>
        </div>
      )}

      {/* 底部資訊 */}
      <div className="flex items-center justify-between mt-3 px-1 text-xs text-gray-400 dark:text-gray-500">
        <span>第 {round} 回合</span>
        <span>✅ {totalCorrect} 　❌ {totalWrong}</span>
      </div>
      <p className="text-center text-[10px] text-gray-300 dark:text-gray-600 mt-2">
        創意發想者：陳閎凱同學（北投國小四年級）
      </p>
    </div>
  )
}
