/**
 * 故事書手繪風 SVG 插圖
 * 每個 export 對應一頁的插圖
 */

const common = 'w-full max-w-[260px] mx-auto'

// 封面：一本打開的書
export function IllustCover() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 書本 */}
      <path d="M30 120 Q30 40 100 35 Q170 40 170 120Z" fill="#FFF7ED" stroke="#C4956A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="38" x2="100" y2="120" stroke="#C4956A" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* 左頁線條（假裝有文字） */}
      <line x1="48" y1="60" x2="88" y2="60" stroke="#D6C4B0" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="72" x2="90" y2="72" stroke="#D6C4B0" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="84" x2="85" y2="84" stroke="#D6C4B0" strokeWidth="2" strokeLinecap="round" />
      {/* 右頁線條 */}
      <line x1="112" y1="60" x2="152" y2="60" stroke="#D6C4B0" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="72" x2="155" y2="72" stroke="#D6C4B0" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="84" x2="150" y2="84" stroke="#D6C4B0" strokeWidth="2" strokeLinecap="round" />
      {/* 星星裝飾 */}
      <circle cx="100" cy="100" r="4" fill="#F59E0B" opacity="0.7" />
      <circle cx="60" cy="48" r="2.5" fill="#F59E0B" opacity="0.5" />
      <circle cx="140" cy="50" r="2" fill="#F59E0B" opacity="0.4" />
    </svg>
  )
}

// 森林與大樹
export function IllustForest() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 地面 */}
      <ellipse cx="100" cy="140" rx="90" ry="12" fill="#D1FAE5" />
      {/* 大橡樹 */}
      <rect x="92" y="80" width="16" height="60" rx="4" fill="#92400E" />
      <circle cx="100" cy="65" r="38" fill="#6EE7B7" stroke="#34D399" strokeWidth="2" />
      <circle cx="78" cy="55" r="18" fill="#34D399" opacity="0.6" />
      <circle cx="125" cy="58" r="15" fill="#34D399" opacity="0.5" />
      {/* 小樹 */}
      <rect x="32" y="110" width="6" height="28" rx="2" fill="#A16207" />
      <circle cx="35" cy="100" r="14" fill="#86EFAC" />
      <rect x="158" y="108" width="6" height="30" rx="2" fill="#A16207" />
      <circle cx="161" cy="98" r="12" fill="#86EFAC" />
      {/* 桌子（大橡樹下） */}
      <ellipse cx="100" cy="132" rx="22" ry="6" fill="#D97706" opacity="0.4" />
    </svg>
  )
}

// 橋樑設計圖（大動物們在討論）
export function IllustBridge() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 河 */}
      <path d="M0 110 Q50 95 100 110 Q150 125 200 108" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M0 118 Q50 103 100 118 Q150 133 200 116" stroke="#93C5FD" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 橋的設計草圖 */}
      <path d="M60 85 Q100 55 140 85" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
      <line x1="70" y1="85" x2="70" y2="105" stroke="#92400E" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="130" y1="85" x2="130" y2="105" stroke="#92400E" strokeWidth="2" strokeDasharray="4 3" />
      {/* 熊（圓形簡筆） */}
      <circle cx="40" cy="70" r="16" fill="#D4A76A" stroke="#92400E" strokeWidth="2" />
      <circle cx="33" cy="60" r="5" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="47" cy="60" r="5" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="36" cy="69" r="1.5" fill="#1C1917" />
      <circle cx="44" cy="69" r="1.5" fill="#1C1917" />
      {/* 鹿 */}
      <circle cx="160" cy="72" r="12" fill="#FBBF24" stroke="#92400E" strokeWidth="2" />
      <line x1="155" y1="60" x2="150" y2="45" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <line x1="165" y1="60" x2="170" y2="45" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="157" cy="71" r="1.2" fill="#1C1917" />
      <circle cx="163" cy="71" r="1.2" fill="#1C1917" />
    </svg>
  )
}

// 小兔子在河邊觀察
export function IllustRabbit() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 河與冰 */}
      <path d="M0 110 Q60 95 120 108 Q180 120 200 112" stroke="#60A5FA" strokeWidth="3" fill="none" />
      <path d="M30 105 L60 102 L45 108Z" fill="#BFDBFE" opacity="0.6" />
      <path d="M120 110 L150 106 L135 113Z" fill="#BFDBFE" opacity="0.5" />
      {/* 軟土標記 */}
      <path d="M70 125 Q80 120 90 125" stroke="#A16207" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M100 128 Q110 123 120 128" stroke="#A16207" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* 兔子 */}
      <ellipse cx="55" cy="85" rx="12" ry="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
      {/* 耳朵 */}
      <ellipse cx="48" cy="60" rx="4" ry="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" transform="rotate(-10 48 60)" />
      <ellipse cx="62" cy="60" rx="4" ry="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" transform="rotate(10 62 60)" />
      <ellipse cx="48" cy="60" rx="2" ry="10" fill="#FECDD3" transform="rotate(-10 48 60)" />
      <ellipse cx="62" cy="60" rx="2" ry="10" fill="#FECDD3" transform="rotate(10 62 60)" />
      {/* 眼睛 */}
      <circle cx="50" cy="82" r="2" fill="#1C1917" />
      <circle cx="60" cy="82" r="2" fill="#1C1917" />
      {/* 想法泡泡 */}
      <circle cx="90" cy="55" r="18" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <circle cx="76" cy="72" r="4" fill="white" stroke="#D1D5DB" strokeWidth="1" />
      <circle cx="72" cy="78" r="2" fill="white" stroke="#D1D5DB" strokeWidth="1" />
      <text x="82" y="58" textAnchor="middle" fontSize="10" fill="#6B7280">❄️</text>
    </svg>
  )
}

// 被拒絕——低頭的兔子
export function IllustSad() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 大熊的手（摸頭） */}
      <path d="M130 60 Q110 50 95 65" stroke="#D4A76A" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* 兔子——低頭 */}
      <ellipse cx="80" cy="95" rx="12" ry="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
      <ellipse cx="73" cy="72" rx="4" ry="12" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" transform="rotate(-20 73 72)" />
      <ellipse cx="87" cy="72" rx="4" ry="12" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" transform="rotate(-5 87 72)" />
      {/* 閉眼（悲傷） */}
      <path d="M75 93 Q78 96 81 93" stroke="#1C1917" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M83 93 Q86 96 89 93" stroke="#1C1917" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 淚滴 */}
      <path d="M76 98 Q75 103 76 106" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
      {/* 對話框：「大人在開會喔」 */}
      <rect x="110" y="30" width="75" height="30" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <path d="M120 60 L110 55 L118 50" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="147" y="48" textAnchor="middle" fontSize="7.5" fill="#6B7280" fontFamily="system-ui">小朋友先回去吧</text>
    </svg>
  )
}

// 三隻小動物聚在一起嘆氣
export function IllustFriends() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 兔子 */}
      <ellipse cx="60" cy="100" rx="11" ry="13" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
      <ellipse cx="54" cy="80" rx="3.5" ry="11" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <ellipse cx="66" cy="80" rx="3.5" ry="11" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <circle cx="56" cy="98" r="1.5" fill="#1C1917" />
      <circle cx="64" cy="98" r="1.5" fill="#1C1917" />
      {/* 松鼠 */}
      <ellipse cx="105" cy="98" rx="12" ry="14" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <path d="M115 82 Q125 75 120 90" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="101" cy="96" r="1.5" fill="#1C1917" />
      <circle cx="109" cy="96" r="1.5" fill="#1C1917" />
      {/* 青蛙 */}
      <ellipse cx="148" cy="102" rx="13" ry="11" fill="#86EFAC" stroke="#22C55E" strokeWidth="2" />
      <circle cx="141" cy="90" r="5" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx="155" cy="90" r="5" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx="141" cy="90" r="2" fill="#1C1917" />
      <circle cx="155" cy="90" r="2" fill="#1C1917" />
      {/* 嘆氣泡泡 */}
      <text x="40" y="65" fontSize="14" fill="#9CA3AF">…</text>
      <text x="95" y="68" fontSize="14" fill="#9CA3AF">…</text>
      <text x="145" y="72" fontSize="14" fill="#9CA3AF">…</text>
    </svg>
  )
}

// 貓頭鷹奶奶
export function IllustOwl() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 樹枝 */}
      <path d="M20 90 Q60 85 100 88 Q140 91 180 85" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
      {/* 貓頭鷹身體 */}
      <ellipse cx="100" cy="65" rx="25" ry="28" fill="#D4A76A" stroke="#92400E" strokeWidth="2" />
      {/* 肚子 */}
      <ellipse cx="100" cy="72" rx="14" ry="16" fill="#FEF3C7" />
      {/* 眼睛 */}
      <circle cx="90" cy="55" r="9" fill="white" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="110" cy="55" r="9" fill="white" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="90" cy="55" r="4" fill="#1C1917" />
      <circle cx="110" cy="55" r="4" fill="#1C1917" />
      <circle cx="92" cy="53" r="1.5" fill="white" />
      <circle cx="112" cy="53" r="1.5" fill="white" />
      {/* 喙 */}
      <path d="M97 62 L100 68 L103 62Z" fill="#F59E0B" />
      {/* 學士帽 */}
      <rect x="82" y="36" width="36" height="4" rx="1" fill="#1C1917" />
      <rect x="94" y="28" width="12" height="10" rx="1" fill="#1C1917" />
      {/* 對話泡泡 */}
      <rect x="130" y="20" width="60" height="45" rx="12" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <path d="M135 55 L128 62 L140 58" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="160" y="38" textAnchor="middle" fontSize="7" fill="#6B7280" fontFamily="system-ui">這叫做</text>
      <text x="160" y="52" textAnchor="middle" fontSize="9" fill="#D97706" fontWeight="bold" fontFamily="system-ui">「表意權」</text>
    </svg>
  )
}

// 勇敢發言——小動物們站在會議桌前
export function IllustBrave() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 會議桌 */}
      <ellipse cx="100" cy="130" rx="70" ry="15" fill="#D97706" opacity="0.3" />
      <ellipse cx="100" cy="126" rx="70" ry="15" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      {/* 兔子站在中間（自信） */}
      <ellipse cx="100" cy="95" rx="12" ry="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
      <ellipse cx="93" cy="74" rx="4" ry="13" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <ellipse cx="107" cy="74" rx="4" ry="13" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <circle cx="96" cy="93" r="2" fill="#1C1917" />
      <circle cx="104" cy="93" r="2" fill="#1C1917" />
      {/* 微笑 */}
      <path d="M96 98 Q100 102 104 98" stroke="#1C1917" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 對話泡泡 */}
      <rect x="55" y="30" width="90" height="30" rx="12" fill="white" stroke="#FDA4AF" strokeWidth="1.5" />
      <path d="M100 60 L97 52 L103 52Z" fill="white" stroke="#FDA4AF" strokeWidth="1.5" />
      <text x="100" y="49" textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="system-ui">可以給我們五分鐘嗎？</text>
      {/* 左邊松鼠 */}
      <ellipse cx="48" cy="100" rx="9" ry="10" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      {/* 右邊青蛙 */}
      <ellipse cx="152" cy="102" rx="10" ry="9" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" />
    </svg>
  )
}

// 大家驚訝
export function IllustSurprise() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 熊——驚訝表情 */}
      <circle cx="70" cy="80" r="22" fill="#D4A76A" stroke="#92400E" strokeWidth="2" />
      <circle cx="62" cy="60" r="7" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="78" cy="60" r="7" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="64" cy="78" r="3" fill="white" stroke="#1C1917" strokeWidth="1.5" />
      <circle cx="76" cy="78" r="3" fill="white" stroke="#1C1917" strokeWidth="1.5" />
      <circle cx="64" cy="78" r="1.5" fill="#1C1917" />
      <circle cx="76" cy="78" r="1.5" fill="#1C1917" />
      <ellipse cx="70" cy="90" rx="4" ry="5" fill="#1C1917" opacity="0.3" />
      {/* 驚嘆號 */}
      <text x="100" y="45" fontSize="28" fill="#EF4444" fontWeight="bold">!</text>
      {/* 鹿——驚訝 */}
      <circle cx="140" cy="82" r="16" fill="#FBBF24" stroke="#92400E" strokeWidth="2" />
      <line x1="134" y1="66" x2="128" y2="50" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <line x1="146" y1="66" x2="152" y2="50" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="135" cy="80" r="2.5" fill="white" stroke="#1C1917" strokeWidth="1.5" />
      <circle cx="145" cy="80" r="2.5" fill="white" stroke="#1C1917" strokeWidth="1.5" />
      <circle cx="135" cy="80" r="1.2" fill="#1C1917" />
      <circle cx="145" cy="80" r="1.2" fill="#1C1917" />
      {/* 對話 */}
      <rect x="35" y="110" width="130" height="25" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="100" y="127" textAnchor="middle" fontSize="8" fill="#6B7280" fontFamily="system-ui">天啊……我們差點犯了一個大錯！</text>
    </svg>
  )
}

// 新決定——步道
export function IllustPath() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 河 */}
      <path d="M0 100 Q50 85 100 100 Q150 115 200 98" fill="#BFDBFE" opacity="0.4" />
      <path d="M0 100 Q50 85 100 100 Q150 115 200 98" stroke="#60A5FA" strokeWidth="2.5" fill="none" />
      {/* 步道（彎曲的路） */}
      <path d="M20 80 Q60 70 100 78 Q140 86 180 75" stroke="#D4A76A" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
      <path d="M20 80 Q60 70 100 78 Q140 86 180 75" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 6" />
      {/* 樹（保留了） */}
      <rect x="30" y="45" width="5" height="25" rx="2" fill="#A16207" />
      <circle cx="32" cy="38" r="12" fill="#86EFAC" />
      <rect x="155" y="40" width="5" height="28" rx="2" fill="#A16207" />
      <circle cx="157" cy="33" r="10" fill="#86EFAC" />
      {/* 池塘（保留了） */}
      <ellipse cx="160" cy="125" rx="20" ry="10" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="1.5" />
      {/* 小動物在步道上 */}
      <circle cx="80" cy="73" r="6" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <circle cx="105" cy="78" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="130" cy="82" r="5" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" />
      {/* 勾勾 */}
      <path d="M88 40 L94 48 L108 30" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 多了小椅子的會議桌
export function IllustChair() {
  return (
    <svg viewBox="0 0 200 160" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 大桌子 */}
      <ellipse cx="100" cy="100" rx="72" ry="20" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* 大椅子 */}
      <rect x="25" y="60" width="18" height="30" rx="4" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      <rect x="75" y="55" width="18" height="30" rx="4" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      <rect x="155" y="60" width="18" height="30" rx="4" fill="#D4A76A" stroke="#92400E" strokeWidth="1.5" />
      {/* 小椅子（亮色！） */}
      <rect x="48" y="70" width="13" height="22" rx="3" fill="#FCA5A5" stroke="#EF4444" strokeWidth="1.5" />
      <rect x="108" y="68" width="13" height="22" rx="3" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" />
      <rect x="138" y="70" width="13" height="22" rx="3" fill="#86EFAC" stroke="#22C55E" strokeWidth="1.5" />
      {/* 牌子 */}
      <rect x="60" y="18" width="80" height="28" rx="6" fill="white" stroke="#D97706" strokeWidth="1.5" />
      <text x="100" y="30" textAnchor="middle" fontSize="6.5" fill="#92400E" fontFamily="system-ui">每個聲音都很重要</text>
      <text x="100" y="40" textAnchor="middle" fontSize="6.5" fill="#92400E" fontFamily="system-ui">——不管你幾歲</text>
    </svg>
  )
}

// 最後一頁：星星與愛心
export function IllustEnd() {
  return (
    <svg viewBox="0 0 200 140" className={common} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 大星星 */}
      <path d="M100 20 L108 45 L135 45 L113 60 L121 85 L100 70 L79 85 L87 60 L65 45 L92 45Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
      {/* 小星星 */}
      <circle cx="40" cy="35" r="4" fill="#FDE68A" />
      <circle cx="160" cy="30" r="3" fill="#FDE68A" />
      <circle cx="30" cy="70" r="2.5" fill="#FBBF24" opacity="0.6" />
      <circle cx="170" cy="65" r="2" fill="#FBBF24" opacity="0.5" />
      {/* 愛心 */}
      <path d="M90 105 Q90 95 100 95 Q110 95 110 105 Q110 115 100 125 Q90 115 90 105Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="1.5" />
      {/* megaphone */}
      <path d="M55 90 L45 80 L45 100Z" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="55" y="85" width="15" height="20" rx="3" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5" />
      {/* 小兔子剪影 */}
      <ellipse cx="150" cy="105" rx="10" ry="12" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <ellipse cx="145" cy="88" rx="3" ry="10" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
      <ellipse cx="155" cy="88" rx="3" ry="10" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1" />
    </svg>
  )
}
