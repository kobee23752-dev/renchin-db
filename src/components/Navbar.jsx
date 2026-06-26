import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, BookOpen, GraduationCap, Wrench, Globe, Smile, Users, ChevronDown, Heart } from 'lucide-react'

const navItems = [
  { path: '/', label: '首頁', icon: Home },
  {
    path: '/laws', label: '法規與公約', icon: BookOpen,
    children: [
      { label: 'CRC 第 12 條', path: '/laws', hash: 'crc-12' },
      { label: '一般性意見第 12 號', path: '/laws', hash: 'gc-12' },
      { label: '兒少福利與權益保障法', path: '/laws', hash: 'cypa' },
      { label: '兒童權利公約施行法', path: '/laws', hash: 'cypa-implementation' },
    ],
  },
  {
    path: '/literature', label: '學術文獻', icon: GraduationCap,
    children: [
      { label: '台灣本土文獻', path: '/literature', hash: 'cat-taiwan' },
      { label: '國外文獻', path: '/literature', hash: 'cat-international' },
    ],
  },
  {
    path: '/tools', label: '實務工具', icon: Wrench,
    children: [
      { label: '班會流程 SOP', path: '/tools', hash: 'class-meeting-sop' },
      { label: '訪談工具與訪綱', path: '/tools', hash: 'interview-guide' },
      { label: 'Lundy 檢核表', path: '/tools', hash: 'lundy-checklist' },
      { label: '城鄉案例比較', path: '/tools', hash: 'urban-rural-comparison' },
    ],
  },
  {
    path: '/crc-review', label: 'CRC國際審查', icon: Globe,
    children: [
      { label: '審查歷程', path: '/crc-review', hash: 'timeline' },
      { label: '行動指南', path: '/crc-review', hash: 'guide' },
      { label: '兒少故事', path: '/crc-review', hash: 'stories' },
    ],
  },
  {
    path: '/empowerment', label: '培力方案', icon: Users,
    children: [
      { label: '研究者原創教案', path: '/empowerment', hash: 'original' },
      { label: '國內方案', path: '/empowerment', hash: 'domestic' },
      { label: '國際方案', path: '/empowerment', hash: 'international' },
    ],
  },
  {
    path: '/kids', label: '兒少專區', icon: Smile,
    children: [
      { label: '故事｜被忘記的小聲音', path: '/kids', hash: 'intro' },
      { label: '遊戲｜捷運大富翁', path: '/kids', hash: 'metro' },
      { label: '遊戲｜我是神槍手', path: '/kids', hash: 'shooter' },
      { label: '遊戲｜配對小達人', path: '/kids', hash: 'cards' },
      { label: '測驗｜情境大考驗', path: '/quiz' },
    ],
  },
  {
    path: '/about', label: '關於', icon: Heart,
    children: [
      { label: '關於仁親', path: '/about', hash: 'association' },
      { label: '關於研究者', path: '/about', hash: 'researcher' },
    ],
  },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-[#D2C4B2]/95 dark:bg-[#2A2420]/95 backdrop-blur-md border-b border-[#C4B5A2] dark:border-[#3D3530]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1">
            <img src="/renching-logo.png" alt="仁親" className="h-9 w-auto" />
            <span className="hidden lg:block font-bold text-primary-800 dark:text-primary-200 text-sm whitespace-nowrap">
              中華仁親社區關懷協會
            </span>
            <span className="lg:hidden font-bold text-primary-800 dark:text-primary-200 text-sm">
              台灣兒少表意權知識平台
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 justify-center flex-1 flex-nowrap min-w-0">
            {navItems.map(({ path, label, icon: Icon, children }) => (
              <div
                key={path}
                className="relative"
                onMouseEnter={() => children && setOpenDropdown(path)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {children ? (
                  <Link
                    to={path}
                    className={`flex items-center gap-1 px-2 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      location.pathname === path
                        ? 'bg-white/50 dark:bg-white/10 text-primary-900 dark:text-primary-100'
                        : 'text-primary-800/70 dark:text-primary-200/70 hover:bg-white/30 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                ) : (
                  <Link
                    to={path}
                    className={`flex items-center gap-1 px-2 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      location.pathname === path
                        ? 'bg-white/50 dark:bg-white/10 text-primary-900 dark:text-primary-100'
                        : 'text-primary-800/70 dark:text-primary-200/70 hover:bg-white/30 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                )}

                {/* Dropdown — pt-2 creates invisible hover bridge between button and menu */}
                {children && openDropdown === path && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div
                      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-primary-100 dark:border-slate-700 py-2"
                      style={path === '/kids' ? { fontFamily: '"BpmfZihiSerif", Georgia, "Noto Serif TC", serif' } : undefined}
                    >
                      {children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.hash ? `${child.path}#${child.hash}` : child.path}
                          onClick={() => { setOpenDropdown(null); window.scrollTo(0, 0) }}
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 text-primary-700 dark:text-primary-300"
              aria-label="選單"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#C4B5A2] dark:border-[#3D3530] bg-[#D2C4B2] dark:bg-[#2A2420]">
          <div className="px-4 py-2 space-y-1">
            {navItems.map(({ path, label, icon: Icon, children }) => (
              <div key={path}>
                {children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === path ? null : path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === path
                          ? 'bg-white/50 dark:bg-white/10 text-primary-900 dark:text-primary-100'
                          : 'text-primary-800/70 dark:text-primary-200/70 hover:bg-white/30 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                      <ChevronDown className={`w-4 h-4 ml-auto opacity-50 transition-transform ${openDropdown === path ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === path && (
                      <div
                        className="ml-11 mt-1 space-y-0.5"
                        style={path === '/kids' ? { fontFamily: '"BpmfZihiSerif", Georgia, "Noto Serif TC", serif' } : undefined}
                      >
                        {children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.hash ? `${child.path}#${child.hash}` : child.path}
                            onClick={() => { setMobileOpen(false); setOpenDropdown(null); window.scrollTo(0, 0) }}
                            className="block px-3 py-1.5 text-sm text-primary-800/60 dark:text-primary-200/60 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === path
                        ? 'bg-white/50 dark:bg-white/10 text-primary-900 dark:text-primary-100'
                        : 'text-primary-800/70 dark:text-primary-200/70 hover:bg-white/30 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
