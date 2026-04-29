import { Link, useLocation } from 'react-router-dom'
import { researcher } from '../data/researcher'
import { GraduationCap, Briefcase, Lightbulb, Mail, Heart, MapPin, Phone, Users, Sprout, Home, HandHeart, ArrowLeft } from 'lucide-react'

const association = {
  name: '中華仁親社區關懷協會',
  slogan: '轉個彎，遇見愛',
  intro:
    '中華仁親社區關懷協會深耕社區服務，以關懷弱勢兒少與長者為核心使命，透過課後照顧、社區陪伴與偏鄉支持等多元服務，致力於建構更溫暖的社區網絡。',
  services: [
    {
      name: '好土計畫',
      icon: Sprout,
      iconBg: 'bg-tag-green/10',
      iconColor: 'text-tag-green',
      description: '針對孩子們的課後照顧與培力',
      areas: '士林、北投',
    },
    {
      name: '好厝邊計畫',
      icon: Home,
      iconBg: 'bg-tag-blue/10',
      iconColor: 'text-tag-blue',
      description: '為社區及獨居長者提供支持與關懷',
      areas: '士林、北投、淡水、三重、福中',
    },
    {
      name: '暖心計畫',
      icon: HandHeart,
      iconBg: 'bg-tag-orange/10',
      iconColor: 'text-tag-orange',
      description: '針對花蓮偏鄉孩子的照顧與支持',
      areas: '花蓮偏鄉',
    },
  ],
  contact: {
    address: '台北市士林區基河路 128 號 3 樓',
    phone: '02-7745-5477',
    fax: '(02)2883-5885',
    email: 'renching8958@gmail.com',
  },
}

export default function AboutPage() {
  const location = useLocation()
  const hash = location.hash.slice(1)

  const showAssociation = !hash || hash === 'association'
  const showResearcher = !hash || hash === 'researcher'
  const isFiltered = hash === 'association' || hash === 'researcher'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {isFiltered && (
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回關於
        </Link>
      )}

      {!isFiltered && (
        <>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              關於
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              認識仁親社區關懷協會與本平台研究者
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Link
              to="/about#association"
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-tag-red/10 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-tag-red" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">關於仁親</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">中華仁親社區關懷協會</p>
            </Link>
            <Link
              to="/about#researcher"
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-tag-purple/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-tag-purple" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">關於研究者</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">李雨函 Marvis</p>
            </Link>
          </div>
        </>
      )}

      {/* ===== 關於仁親 ===== */}
      {showAssociation && <section id="association" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-tag-red/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-tag-red" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {association.name}
            </h2>
            <p className="text-sm text-tag-red font-medium">{association.slogan}</p>
          </div>
        </div>

        {/* Photo + Intro */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 overflow-hidden mb-6">
          <img
            src="/renching-teacher.jpg"
            alt="中華仁親社區關懷協會"
            className="w-full h-48 md:h-72 object-cover" style={{ objectPosition: 'center 25%' }}
          />
          <div className="p-6 md:p-8">
            <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.85]">
              {association.intro}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {association.services.map((svc) => {
            const SvcIcon = svc.icon
            return (
              <div
                key={svc.name}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-5"
              >
                <div className={`w-10 h-10 rounded-xl ${svc.iconBg} flex items-center justify-center mb-3`}>
                  <SvcIcon className={`w-5 h-5 ${svc.iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{svc.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{svc.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {svc.areas}
                </p>
              </div>
            )
          })}
        </div>

        {/* Contact */}
        <div className="bg-primary-50/50 dark:bg-slate-800/50 rounded-2xl border border-primary-200 dark:border-slate-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">聯絡資訊</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {association.contact.address}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {association.contact.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {association.contact.email}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs flex-shrink-0">FAX</span>
              {association.contact.fax}
            </div>
          </div>
        </div>

        {/* MV */}
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 overflow-hidden">
          <div className="p-5 pb-3">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">仁親主題曲 — 愛會溫暖這世界</h3>
            <p className="text-xs text-gray-400">疫起讓愛走動 — 仁親協會慈善公益創作曲</p>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Pff6HdaWP6c"
              title="愛會溫暖這世界 — 仁親協會主題曲"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>}

      {/* ===== 關於研究者 ===== */}
      {showResearcher && <section id="researcher" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-tag-purple/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-tag-purple" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">關於研究者</h2>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-50 via-primary-100/30 to-primary-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl border border-primary-200 dark:border-slate-700 overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="flex-shrink-0">
              <img
                src={researcher.photo}
                alt={researcher.name}
                className="w-48 md:w-56 rounded-2xl object-contain shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              <div
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-primary-100 dark:bg-slate-800 items-center justify-center text-6xl hidden"
              >
                👩‍🔬
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {researcher.name}
              </h3>
              <p className="text-lg text-primary-600 dark:text-primary-500 font-medium mb-4">
                {researcher.title}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {researcher.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">研究動機</h3>
          </div>
          {researcher.motivation.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">學歷</h3>
            </div>
            <div className="space-y-4">
              {researcher.education.map((edu) => (
                <div key={edu.school} className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-400 mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{edu.school}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-5">
              <Briefcase className="w-6 h-6 text-primary-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">經歷</h3>
            </div>
            <div className="space-y-3">
              {researcher.experiences.map((exp) => (
                <div key={`${exp.org}-${exp.role}`} className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-400 mt-2" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{exp.org}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Researcher Contact */}
        <div className="bg-primary-50/50 dark:bg-slate-800/50 rounded-2xl border border-primary-200 dark:border-slate-700 p-5 mt-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">聯絡研究者</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a href="mailto:kobee23752@gmail.com" className="hover:text-primary-600 transition-colors">
              kobee23752@gmail.com
            </a>
          </div>
        </div>
      </section>}

      {/* Footer note */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          本平台為碩士論文研究成果之延伸，所有內容基於學術文獻與仁親協會實務經驗整理
        </p>
      </div>
    </div>
  )
}
