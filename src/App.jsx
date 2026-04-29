import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LawsPage from './pages/LawsPage'
import LiteraturePage from './pages/LiteraturePage'
import ToolsPage from './pages/ToolsPage'
import CRCReviewPage from './pages/CRCReviewPage'
import KidsZonePage from './pages/KidsZonePage'
import EmpowermentPage from './pages/EmpowermentPage'
import QuizPage from './pages/QuizPage'
import AboutPage from './pages/AboutPage'
import SearchResultsPage from './pages/SearchResultsPage'

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('renchin-dark', false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Scroll to top on every navigation; hash is used for filtering, not scroll position
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  function handleSearch(query) {
    setSearchQuery(query)
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  // ── 全站背景音樂（仁親主題曲）──
  const bgmRef = useRef(null)
  const [bgmPlaying, setBgmPlaying] = useState(false)

  useEffect(() => {
    const a = new Audio('/site-bgm.mp3')
    a.loop = true
    a.volume = 0.25
    bgmRef.current = a
    return () => { a.pause(); a.src = '' }
  }, [])

  function toggleSiteBgm() {
    const a = bgmRef.current
    if (!a) return
    if (bgmPlaying) {
      a.pause()
      setBgmPlaying(false)
    } else {
      a.play().catch(() => {})
      setBgmPlaying(true)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1714] transition-colors">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 全站音樂浮動按鈕 */}
      <button
        onClick={toggleSiteBgm}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
          bgmPlaying
            ? 'bg-primary-600 text-white animate-pulse'
            : 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-slate-600'
        }`}
        title={bgmPlaying ? '暫停音樂' : '播放仁親主題曲'}
      >
        {bgmPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        )}
      </button>

      <main>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={handleSearch} />} />
          <Route path="/laws" element={<LawsPage />} />
          <Route path="/literature" element={<LiteraturePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/crc-review" element={<CRCReviewPage />} />
          <Route path="/kids" element={<KidsZonePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/empowerment" element={<EmpowermentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </main>
      <footer className="bg-primary-50 dark:bg-slate-800 border-t border-primary-100 dark:border-slate-700 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            台灣兒少表意權知識平台 — 仁親社區關懷協會 × 李雨函 Marvis
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            本平台為碩士論文研究成果之延伸
          </p>
        </div>
      </footer>
    </div>
  )
}
