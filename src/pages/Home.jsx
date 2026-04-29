import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { youthReps, regions, terms, getTotalByTerm, dataSourceUrl } from '../data/youthReps'
import { ArrowRight, ExternalLink } from 'lucide-react'

/* ── 縣市標籤位置（對應 taiwan-map.jpg 的百分比座標） ── */
const cityLabels = {
  '連江縣': { left: '10%', top: '8%' },
  '基隆市': { left: '66%', top: '8%' },
  '台北市': { left: '46%', top: '12%' },
  '新北市': { left: '58%', top: '17%' },
  '桃園市': { left: '34%', top: '21%' },
  '新竹縣': { left: '36%', top: '27%' },
  '新竹市': { left: '25%', top: '30%' },
  '宜蘭縣': { left: '78%', top: '19%' },
  '苗栗縣': { left: '27%', top: '35%' },
  '台中市': { left: '25%', top: '41%' },
  '彰化縣': { left: '18%', top: '48%' },
  '南投縣': { left: '42%', top: '44%' },
  '雲林縣': { left: '20%', top: '54%' },
  '嘉義縣': { left: '30%', top: '58%' },
  '嘉義市': { left: '20%', top: '61%' },
  '台南市': { left: '26%', top: '68%' },
  '花蓮縣': { left: '63%', top: '40%' },
  '高雄市': { left: '35%', top: '77%' },
  '台東縣': { left: '57%', top: '66%' },
  '屏東縣': { left: '46%', top: '87%' },
  '澎湖縣': { left: '6%', top: '52%' },
  '金門縣': { left: '3%', top: '18%' },
}

const mapCities = youthReps.filter((c) => cityLabels[c.name])

export default function Home({ searchQuery, setSearchQuery }) {
  const [activeTerm, setActiveTerm] = useState('2023')
  const total = getTotalByTerm(activeTerm)

  return (
    <div>
      {/* ══ Hero — 封面橫幅 ══ */}
      <section className="relative overflow-hidden h-[420px] md:h-[540px]">
        <img
          src="/hero.png"
          alt="兒少表意權 — 多元教育與創意表達"
          className="absolute inset-0 w-full h-full object-cover scale-125 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60 dark:from-[#1A1714]/95 dark:via-[#1A1714]/85 dark:to-[#1A1714]/60" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-3 leading-tight">
                台灣<span className="underline-hand">兒少表意權</span><br />知識平台
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                從國際公約到在地實踐，匯集法規、文獻與實務工具，<br className="hidden md:block" />讓每個孩子的聲音都被聽見。
              </p>
              <div className="max-w-md">
                <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="搜尋法規、文獻、工具、教材..." />
              </div>
              {searchQuery && (
                <Link to={`/search?q=${encodeURIComponent(searchQuery)}`} className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-3 text-sm">
                  查看所有搜尋結果 <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 台灣兒少代表地圖 ══ */}
      <section className="py-16 md:py-20 bg-primary-50/60 dark:bg-slate-800/40">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 dark:text-primary-100 text-center mb-2">
            全台兒少代表分布
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
            各縣市兒少諮詢代表人數一覽
          </p>

          {/* 年度切換 */}
          <div className="flex justify-center mb-10 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-2">
              {terms.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTerm(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTerm === t.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-slate-700 border border-primary-200 dark:border-slate-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
            {/* 地圖（圖片 + 標籤疊加） */}
            <div className="flex-shrink-0 w-64 md:w-72 lg:w-80 relative mt-6">
              <img
                src="/taiwan-map.jpg"
                alt="台灣地圖"
                className="w-full h-auto rounded-xl mix-blend-multiply dark:mix-blend-screen"
                style={{ filter: 'sepia(0.35) saturate(0.65) hue-rotate(-10deg) brightness(1.08)' }}
              />
              {/* 縣市標籤 */}
              {mapCities.map((city) => {
                const pos = cityLabels[city.name]
                const count = city.counts[activeTerm] || 0
                if (!pos) return null
                return (
                  <div
                    key={city.name}
                    className="absolute pointer-events-none"
                    style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                  >
                    <span className="inline-flex items-center gap-0.5 bg-white/85 dark:bg-slate-900/80 backdrop-blur-sm rounded-md px-1 py-0.5 shadow-sm whitespace-nowrap">
                      <span className="text-[8px] md:text-[9px] font-medium text-primary-800 dark:text-primary-200">
                        {city.name}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-bold text-tag-red">
                        {count}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>

            {/* 縣市列表 */}
            <div className="flex-1 w-full">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-primary-700 dark:text-primary-300">{total}</span>
                <span className="text-lg text-slate-500 dark:text-slate-400">位兒少代表</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                {regions.map((region) => {
                  const cities = youthReps.filter((c) => c.region === region)
                  return (
                    <div key={region}>
                      <h4 className="text-xs font-bold text-primary-500 dark:text-primary-400 tracking-wider mb-2 pb-1 border-b border-primary-200 dark:border-slate-700">
                        {region}
                      </h4>
                      <div className="space-y-1.5">
                        {cities.map((city) => (
                          <div key={city.name} className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-300">{city.name}</span>
                            <span className="font-semibold text-primary-700 dark:text-primary-300 tabular-nums">
                              {city.counts[activeTerm] || 0}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 資料來源與完整統計連結 */}
              <div className="mt-8 pt-6 border-t border-primary-200 dark:border-slate-700">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                  資料來源：衛生福利部社會及家庭署，各直轄市、縣市政府（更新時間 2024 年 5 月）
                </p>
                <a
                  href={dataSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  查看完整統計資料（PDF）
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 兒少代表制度沿革 ══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 dark:text-primary-100 text-center mb-2">
            兒少代表制度沿革
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-12">
            從法規建立到全面參與的歷程
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-slate-700 -translate-x-1/2" />

            {[
              {
                year: '2011',
                title: '法律基礎確立',
                desc: '《兒童及少年福利與權益保障法》全文修正公布，第 10 條首次明定地方政府兒少福利相關會議應邀集「兒童及少年代表」參與，建立兒少代表制度的法律依據。',
                color: 'bg-tag-blue',
              },
              {
                year: '2012',
                title: '地方政府率先實施',
                desc: '台北市、新北市等率先遴選兒少諮詢代表，開啟地方兒少代表參與政策討論的先例。此後各縣市陸續跟進。',
                color: 'bg-tag-teal',
              },
              {
                year: '2014',
                title: 'CRC 施行法通過',
                desc: '《兒童權利公約施行法》公布施行，第 6 條要求行政院設立「兒童及少年福利與權益推動小組」，但此階段尚未納入兒少代表為正式成員。',
                color: 'bg-tag-purple',
              },
              {
                year: '2018',
                title: '全台 22 縣市皆設兒少代表',
                desc: '至 2018 年，全台 22 個直轄市及縣市政府全數建立兒少諮詢代表制度，實現地方層級的全面覆蓋。',
                color: 'bg-tag-green',
              },
              {
                year: '2019',
                title: '關鍵修法：中央正式納入兒少代表',
                desc: '兒權法第 10 條修正，明定兒少代表為地方委員會正式「委員」而非僅列席。同年 CRC 施行法第 6 條修正，將兒少代表納入行政院推動小組的法定成員。',
                color: 'bg-tag-red',
              },
              {
                year: '2020',
                title: '中央兒少代表團試辦',
                desc: '首批 53 名中央兒少代表於 3 月成立，試行至年底。各縣市推薦代表參與中央層級的兒少福利政策討論。',
                color: 'bg-tag-orange',
              },
              {
                year: '2021',
                title: '第一屆正式中央兒少代表',
                desc: '正式核定 60 名中央兒少代表（任期至 2022 年底），兒少代表制度從地方到中央全面制度化，落實 CRC 第 12 條兒童表意權的精神。',
                color: 'bg-tag-blue',
              },
            ].map((item, i) => (
              <div key={item.year} className={`relative flex items-start gap-4 md:gap-0 mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full ${item.color} ring-4 ring-white dark:ring-[#1A1714]`} />
                </div>
                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-primary-100 dark:border-slate-700 shadow-sm">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold text-white ${item.color} mb-2`}>
                      {item.year}
                    </span>
                    <h3 className="font-bold text-primary-900 dark:text-primary-100 mb-1.5">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 中央 vs 地方兒少代表制度比較 ══ */}
      <section className="py-16 md:py-20 bg-primary-50/60 dark:bg-slate-800/40">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 dark:text-primary-100 text-center mb-2">
            中央與地方兒少代表制度比較
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-12">
            兩套制度各有法源依據與運作方式
          </p>

          {/* 比較表格 */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* 地方 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-tag-teal px-6 py-4">
                <h3 className="text-lg font-bold text-white">地方兒少代表</h3>
                <p className="text-teal-100 text-sm">各縣市兒少諮詢代表</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: '法源依據', value: '兒童及少年福利與權益保障法 第 10 條' },
                  { label: '所屬單位', value: '各直轄市、縣市政府' },
                  { label: '委員會名稱', value: '兒童及少年福利與權益促進委員會' },
                  { label: '遴選方式', value: '由各縣市自訂辦法，通常經公開徵選或團體推薦' },
                  { label: '年齡資格', value: '遴選時未滿 18 歲' },
                  { label: '任期', value: '2 年（各縣市略有不同）' },
                  { label: '實施時間', value: '2012 年起陸續實施' },
                  { label: '主要職責', value: '出席地方兒少福利政策會議，就兒少相關議題提供意見' },
                ].map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs font-bold text-primary-500 dark:text-primary-400 tracking-wider mb-0.5">{row.label}</dt>
                    <dd className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </div>
            </div>

            {/* 中央 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-tag-blue px-6 py-4">
                <h3 className="text-lg font-bold text-white">中央兒少代表</h3>
                <p className="text-blue-100 text-sm">行政院層級兒少代表</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: '法源依據', value: '兒童權利公約施行法 第 6 條 + 行政院推動小組設置要點' },
                  { label: '所屬單位', value: '行政院（由衛福部社家署執行）' },
                  { label: '委員會名稱', value: '行政院兒童及少年福利與權益推動小組' },
                  { label: '遴選方式', value: '各縣市推薦 1–3 名，通常需具備地方兒少代表經歷' },
                  { label: '年齡資格', value: '遴選時未滿 18 歲' },
                  { label: '任期', value: '1 年（其他委員為 2 年）' },
                  { label: '實施時間', value: '2020 年試辦，2021 年正式實施' },
                  { label: '主要職責', value: '參與中央兒少政策推動、CRC 國家報告審查、跨部會兒少議題討論' },
                ].map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs font-bold text-primary-500 dark:text-primary-400 tracking-wider mb-0.5">{row.label}</dt>
                    <dd className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 補充說明 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-primary-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <p className="font-semibold text-primary-700 dark:text-primary-300 mb-2">制度關聯</p>
            <p>兩套制度皆源於聯合國《兒童權利公約》(CRC) 第 12 條對兒童表意權的保障。地方兒少代表聚焦於各縣市的在地兒少福利議題；中央兒少代表則代表全國視角，參與跨部會政策討論與國際審查。中央代表通常由地方代表中遴選產生，形成由下而上的參與體系。</p>
          </div>
        </div>
      </section>

    </div>
  )
}
