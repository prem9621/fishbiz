import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Link, NavLink, Route, Routes, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import founderImg from './assets/founder.jpg'
import { 
  User, 
  Search as SearchIcon, 
  ShoppingBag, 
  Heart, 
  Home as HomeIcon, 
  Info, 
  Phone, 
  LayoutDashboard,
  Menu,
  X,
  MapPin,
  Mail,
  ArrowRight,
  CheckCircle2,
  Globe,
  Award,
  ShieldCheck,
  Waves
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919371306189'
const AUTH_TOKEN_KEY = 'fishbiz-auth-token'
const STORE_NAME = 'Maritime Excellence'
const STORE_OWNER = 'Sameer Qureshi & brother\'s'
const STORE_PHONE_DISPLAY = '+91 93713 06189'
const STORE_EMAIL = 'contact@oceanblue.com'
const STORE_MAP_LINK = 'https://maps.app.goo.gl/jmvhzV33xn3NsMHE6'

const api = axios.create({ baseURL: API_URL })

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Collection' },
  { to: '/contact', label: 'Contact' },
]

const statusClasses = {
  'In Stock': 'bg-sky-100 text-sky-800',
  'Available': 'bg-sky-100 text-sky-800',
  'Low Stock': 'bg-cyan-100 text-cyan-800',
  'Out of Stock': 'bg-slate-100 text-slate-500',
  'Sold Out': 'bg-slate-100 text-slate-500',
}

const categories = [
  { name: 'Fresh Fish', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=500&q=80' },
  { name: 'Prawns', image: 'https://images.unsplash.com/photo-1615141982440-4bd8d85f3f98?auto=format&fit=crop&w=500&q=80' },
  { name: 'Crabs', image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=500&q=80' },
  { name: 'Marinated', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80' },
]

const recipeCards = [
  { title: 'Pan Seared Pomfret', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=700&q=80' },
  { title: 'Surmai Tawa Fry', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=700&q=80' },
  { title: 'Bangda Curry', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=80' },
]

const fishVarieties = [
  {
    name: 'Surmai (King Mackerel)',
    info: 'Rich flavor, low bones, ideal for fry and grill.',
    bestFor: 'Tawa fry, steaks',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Pomfret',
    info: 'Soft texture and premium taste for home and hotel cooking.',
    bestFor: 'Whole fry, curry',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Bangda',
    info: 'Affordable daily fish with strong authentic coastal taste.',
    bestFor: 'Masala fry, curry',
    image: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Rohu',
    info: 'Popular freshwater fish with thick pieces and mild taste.',
    bestFor: 'Curry, steamed',
    image: 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Katla',
    info: 'Meaty fish preferred by families for lunch and dinner.',
    bestFor: 'Traditional gravy',
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Prawns',
    info: 'Cleaned fresh prawns available in multiple sizes.',
    bestFor: 'Biryani, butter garlic',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
  },
]

const shortcutItems = [
  { icon: '🐟', label: 'Fresh Fish' },
  { icon: '🦐', label: 'Prawns' },
  { icon: '🦀', label: 'Crabs' },
  { icon: '🧊', label: 'Chilled Cut' },
  { icon: '🚚', label: 'Fast Delivery' },
  { icon: '⭐', label: 'Top Rated' },
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-1 md:gap-2">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`rounded-xl px-3 py-1.5 text-[10px] md:text-[11px] font-black tracking-widest transition-all ${
          i18n.language === 'en' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage('mr')}
        className={`rounded-xl px-3 py-1.5 text-[10px] md:text-[11px] font-black tracking-widest transition-all ${
          i18n.language === 'mr' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
        }`}
      >
        मराठी
      </button>
      <button
        onClick={() => i18n.changeLanguage('hi')}
        className={`rounded-xl px-3 py-1.5 text-[10px] md:text-[11px] font-black tracking-widest transition-all ${
          i18n.language === 'hi' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
        }`}
      >
        हिंदी
      </button>
    </div>
  )
}

function makeImageUrl(imageUrl) {
  if (!imageUrl) return 'https://via.placeholder.com/640x360?text=Fish+Image'
  if (imageUrl.startsWith('http')) return imageUrl
  return `${API_URL.replace('/api', '')}${imageUrl}`
}

function makeWhatsAppUrl(productName = '', whatsappNumber = WHATSAPP_NUMBER) {
  const text = productName
    ? `Hi, I want to inquire about ${productName}. Please share details.`
    : 'Hi, please share today fresh fish stock.'
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}

function SectionTitle({ label, title, subtitle, center, dark }) {
  return (
    <div className={`space-y-4 ${center ? 'text-center' : 'text-left'}`}>
      <span className={`inline-block text-[10px] font-black uppercase tracking-[0.5em] ${dark ? 'text-sky-400' : 'text-sky-600'}`}>
        {label}
      </span>
      <h2 className={`text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] ${dark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg font-medium leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-16 h-1.5 bg-sky-600 rounded-full mt-6 ${center ? 'mx-auto' : ''}`} />
    </div>
  )
}

function Shell({ children, storeInfo, searchQuery, setSearchQuery }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mobileNavItems = [
    { to: '/', icon: <HomeIcon size={20} />, label: 'Home' },
    { to: '/products', icon: <ShoppingBag size={20} />, label: 'Collection' },
    { to: '/about', icon: <Info size={20} />, label: 'About' },
    { to: '/contact', icon: <Phone size={20} />, label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-900 pb-20 md:pb-0 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Mobile Top Bar (Language Selection) */}
      <div className="md:hidden bg-sky-950 text-slate-400 py-3 border-b border-white/5">
        <div className="mx-auto px-4 flex items-center justify-center">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Premium Top Bar (Desktop) */}
      <div className="hidden md:block bg-sky-950 text-slate-400 py-2 border-b border-white/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 text-[11px] font-medium uppercase tracking-widest">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Phone size={12} className="text-sky-400" /> {storeInfo.phone}</span>
            <span className="flex items-center gap-2"><Mail size={12} className="text-sky-400" /> {storeInfo.email}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white font-bold">Maritime Excellence</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 transition-all duration-500">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="bg-white/80 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-2xl shadow-sky-900/5 px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
            {/* Language Switcher in Logo Area */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Search & Admin */}
            <div className="flex-1 max-w-2xl flex items-center gap-3">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  placeholder={t('SearchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (location.pathname !== '/products') navigate('/products')
                  }}
                  className="w-full h-11 md:h-12 rounded-2xl border border-sky-100 bg-sky-50/50 px-5 pl-12 text-sm font-medium outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all placeholder:text-slate-400"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 group-focus-within:text-sky-600" size={20} />
              </div>
              
              <Link 
                to="/admin" 
                className="w-11 h-11 md:w-12 md:h-12 rounded-2xl border border-sky-100 bg-white flex items-center justify-center text-sky-600 hover:text-sky-700 hover:border-sky-200 hover:bg-sky-50 transition-all shadow-sm active:scale-95"
                title="Admin Intelligence"
              >
                <LayoutDashboard size={20} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all ${
                      isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {t(item.label)}
                </NavLink>
              ))}
            </nav>

            <button className="hidden md:flex lg:hidden p-3 rounded-2xl bg-slate-100 text-slate-600">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Bar (Luxury Glass) */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="bg-sky-950/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl shadow-sky-950/40 px-2 py-2">
          <div className="flex justify-around items-center">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                    isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-400'
                  }`
                }
              >
                {item.icon}
                <span className="text-[10px] font-black uppercase tracking-[0.1em]">{t(item.label)}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-sky-950 text-white pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-sky-400 to-sky-600 opacity-50" />
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-xl">
                <Waves size={32} />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter italic uppercase">Maritime</span>
                <span className="text-xs font-bold tracking-[0.4em] text-sky-400 uppercase">Excellence</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {storeInfo.description || `Crafting a legacy of maritime excellence. We bridge the world's finest oceans to your table with uncompromising quality and Indian heritage.`}
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI'].map(social => (
                <button key={social} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-white hover:text-sky-950 transition-all">{social}</button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-sky-400 mb-8">{t('Company')}</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('About')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Collection')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Contact')}</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {t('Admin')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-sky-400 mb-8">{t('Support')}</h4>
            <ul className="space-y-6 text-sm font-medium text-slate-300">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 shrink-0"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct Line</p>
                  <p className="font-bold text-white">{storeInfo.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 shrink-0"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Inquiries</p>
                  <p className="font-bold text-white">{storeInfo.email}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-sky-400 mb-8">Global Newsletter</h4>
            <p className="text-slate-400 text-xs mb-6 font-medium">Subscribe to receive exclusive maritime market insights and stock arrivals.</p>
            <div className="relative group">
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:bg-white/10 focus:border-sky-500 transition-all" placeholder="Enter Email" />
              <button className="absolute right-2 top-2 bottom-2 bg-sky-600 text-white px-4 rounded-xl font-bold text-xs hover:bg-sky-500 transition-all shadow-lg active:scale-95 italic">JOIN</button>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <p>© 2026 MARITIME HERITAGE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Trade</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sustainability Report</span>
          </div>
        </div>
      </footer>

      {/* Luxury WhatsApp Float */}
      <a
        href={makeWhatsAppUrl('', storeInfo.whatsapp)}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-50 md:bottom-8 md:right-8 group"
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
          <Phone size={24} className="md:w-7 md:h-7" />
        </div>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap pointer-events-none">
          Inquire Now
        </div>
      </a>
    </div>
  )
}

function FishCard({ fish, whatsappNumber }) {
  const { t } = useTranslation()
  return (
    <article className="group overflow-hidden rounded-[32px] border border-sky-100 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={makeImageUrl(fish.imageUrl)} alt={fish.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-3 right-3">
          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm ${statusClasses[fish.availability] || 'bg-slate-100 text-slate-700'}`}>
            {t(fish.availability)}
          </span>
        </div>
        {fish.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 rounded-full bg-sky-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              <CheckCircle2 size={10} /> {t('Featured')}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 [font-family:'Playfair_Display',serif]">{fish.name}</h3>
          <div className="flex items-center gap-1 text-sky-500 font-bold text-xs">
            ⭐ 5.0
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-slate-500 leading-relaxed font-medium">{fish.description}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-black text-sky-700">{fish.price || t('PriceOnRequest')}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link to={`/products/${fish.id}`} className="flex items-center justify-center gap-2 rounded-xl border border-sky-100 py-2.5 text-xs font-bold text-sky-800 transition-all hover:bg-sky-50 active:scale-95">
            <Info size={14} /> {t('Details')}
          </Link>
          <a href={makeWhatsAppUrl(fish.name, whatsappNumber)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-black text-white transition-all hover:bg-sky-700 active:scale-95 shadow-md shadow-sky-200">
            <Phone size={14} /> {t('Inquiry')}
          </a>
        </div>
      </div>
    </article>
  )
}

function VarietyCard({ fish, whatsappNumber }) {
  const { t } = useTranslation()
  return (
    <article className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img src={fish.image} alt={fish.name} className="h-36 w-full object-cover" />
      <div className="space-y-1.5 p-4">
        <p className="text-sm font-black text-slate-900">{fish.name}</p>
        <p className="text-xs text-slate-600">{fish.info}</p>
        <p className="text-xs font-semibold text-sky-700">{t('BestFor')}: {fish.bestFor}</p>
        <a
          href={makeWhatsAppUrl(fish.name, whatsappNumber)}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-lg bg-sky-700 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-sky-800"
        >
          {t('AskOwner')}
        </a>
      </div>
    </article>
  )
}

function Home({ products, storeInfo, isSearching }) {
  const { t } = useTranslation()
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4)
  const stockToday = products.filter((item) => item.availability !== 'Out of Stock').slice(0, 8)

  if (isSearching) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20 min-h-[60vh]">
        <div className="flex items-center justify-between mb-12">
          <SectionTitle label={t('Search')} title={`Discovery Results`} subtitle={`${products.length} maritime treasures found matching your query`} />
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {products.map((fish) => (
              <FishCard key={fish.id} fish={fish} whatsappNumber={storeInfo.whatsapp} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <SearchIcon size={64} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-black uppercase tracking-widest">{t('FishNotFound')}</p>
          </motion.div>
        )}
      </section>
    )
  }

  return (
    <div className="space-y-0">
      {/* 1. Hero Section (Apple-level Premium) */}
      <section className="relative h-[92vh] flex items-center overflow-hidden">
        {/* Luxury Background Overlay */}
        <div className="absolute inset-0 bg-sky-950 z-10 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-sky-950/20 z-10" />
        
        {/* Background Image (In real app, use video) */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={storeInfo.heroImage || "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1400&q=80"} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hero Content */}
        <div className="mx-auto max-w-7xl w-full px-6 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-sky-600/20 backdrop-blur-md border border-sky-400/30 text-sky-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Maritime Excellence Since 1998
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase italic">
                The World's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">Finest Catch</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-12">
                {storeInfo.description || "Maritime Excellence bridges the gap between the deep blue and your discerning palate. Experience premium maritime treasures curated with Indian heritage."}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/products" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
                  <span className="relative z-10">Explore Collection</span>
                  <div className="absolute inset-0 bg-sky-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">Explore Collection</span>
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                  Direct Inquiry
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Wave Element */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24 text-[#f8fafc] fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Featured Catch (Luxury Showcase) */}
      {featuredProducts.length > 0 && (
        <section className="bg-[#f0f9ff] py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <SectionTitle 
                label="The Premiere" 
                title="Featured Catch" 
                subtitle="The season's most sought-after maritime treasures, selected for absolute perfection." 
              />
              <Link to="/products" className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-sky-600">
                View All Collection <div className="w-12 h-12 rounded-full border border-sky-100 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all"><ArrowRight size={20} /></div>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((fish, idx) => (
                <motion.div
                  key={fish.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <FishCard fish={fish} whatsappNumber={storeInfo.whatsapp} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Why Choose Us (Iconic Quality) */}
      <section className="bg-white py-32 relative overflow-hidden">
        {/* Subtle Indian Pattern Watermark */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,#000_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <SectionTitle 
              label="Standard of Excellence" 
              title="Our Maritime Philosophy" 
              subtitle="Beyond supply, we deliver trust. Our commitment to quality is the cornerstone of our maritime legacy." 
              center
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Direct Sourcing", desc: "Straight from the deep blue, bypassing traditional markets for ultimate freshness.", icon: <Waves className="text-sky-600" /> },
              { title: "Global Standards", desc: "Adhering to international safety and hygiene protocols for world-class seafood.", icon: <Globe className="text-sky-600" /> },
              { title: "Artisanal Cuts", desc: "Expertly processed by masters of the craft, ensuring every piece is a masterpiece.", icon: <Award className="text-sky-600" /> },
              { title: "Sustainable Trade", desc: "Preserving our maritime heritage through responsible and ethical sourcing.", icon: <ShieldCheck className="text-sky-600" /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[40px] border border-slate-100 bg-white hover:shadow-2xl hover:shadow-sky-900/5 transition-all duration-500 text-center"
              >
                <div className="mx-auto w-20 h-20 rounded-3xl bg-sky-50 flex items-center justify-center mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Company Story (Indian Heritage) */}
      <section className="bg-sky-950 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-900/20 blur-[120px] rounded-full translate-x-1/2" />
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-[48px] overflow-hidden border border-white/10 shadow-2xl group/founder">
              <img src={founderImg} alt="The Founder" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover/founder:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10">
                <p className="text-sky-400 font-black text-xs uppercase tracking-[0.4em] mb-2">The Founder</p>
                <p className="text-white text-3xl font-black italic tracking-tighter uppercase">{storeInfo.owner}</p>
              </div>
            </div>
            {/* Indian Imagination: Sea Blue accent instead of saffron */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/10 blur-[60px] rounded-full" />
          </div>
          <div className="w-full lg:w-1/2 space-y-12">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle 
                label="Our Legacy" 
                title="Indian Heritage, Global Vision" 
                subtitle="" 
                dark
              />
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-medium">
                <p>
                  From the historic shores of India to the sophisticated markets of the world, our maritime heritage represents a lineage of experts dedicated to the ocean's bounty.
                </p>
                <p>
                  Founded by {storeInfo.owner}, our mission has always been clear: to provide a direct conduit between the artisanal fishing communities of India and the global gastronomy elite.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 mt-16">
                <div>
                  <p className="text-4xl font-black text-white italic tracking-tighter mb-2">25+</p>
                  <p className="text-xs font-black uppercase tracking-widest text-sky-400">Years of Heritage</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white italic tracking-tighter mb-2">10k+</p>
                  <p className="text-xs font-black uppercase tracking-widest text-sky-400">Maritime Miles</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Global Reach (Export Intelligence) */}
      <section className="bg-white py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <SectionTitle 
              label="Worldwide Logistics" 
              title="A Presence Without Borders" 
              subtitle="Exporting the soul of Indian oceans to discerning partners across North America, Europe, and the Middle East." 
              center
            />
          </div>
          <div className="relative rounded-[60px] overflow-hidden bg-slate-100 h-[500px] border border-slate-200 group">
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-sky-900/10" />
            
            {/* Map Pointers (Animated) */}
            {[
              { top: '30%', left: '20%', label: 'USA' },
              { top: '25%', left: '50%', label: 'Europe' },
              { top: '45%', left: '65%', label: 'Middle East' },
              { top: '55%', left: '75%', label: 'India (HQ)' },
              { top: '40%', left: '85%', label: 'East Asia' }
            ].map((point, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                style={{ top: point.top, left: point.left }}
                className="absolute z-20 group/point"
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-sky-600 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.6)] animate-ping absolute inset-0" />
                  <div className="w-4 h-4 bg-sky-600 rounded-full border-2 border-white relative z-10" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    {point.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery (The Visual Odyssey) */}
      <section className="bg-[#f8fafc] py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <SectionTitle 
              label="The Visual Journey" 
              title="Maritime Gallery" 
              subtitle="A curated look into our world—from the dawn's first catch to our state-of-the-art logistics." 
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
            ].map((img, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 0.98 }}
                className={`overflow-hidden rounded-3xl border border-slate-100 shadow-lg ${i === 0 || i === 3 ? 'md:col-span-2' : ''}`}
              >
                <img src={img} className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Inquiry (The Luxury Handshake) */}
      <section className="bg-white py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-600/5 blur-[100px] rounded-full" />
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <SectionTitle 
                label="Direct Engagement" 
                title="Initiate a Collaboration" 
                subtitle="Whether you are a global distributor or a luxury hotel, we invite you to experience the OceanBlue standard." 
              />
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 rounded-[32px] bg-sky-50/50 border border-sky-100 group hover:border-sky-200 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-sky-600 shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-all"><Phone size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Direct Inquiries</p>
                    <p className="text-xl font-black text-slate-900">{storeInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 rounded-[32px] bg-sky-50/50 border border-sky-100 group hover:border-sky-200 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-sky-600 shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-all"><Mail size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Correspondence</p>
                    <p className="text-xl font-black text-slate-900">{storeInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-12 rounded-[48px] border border-sky-100 shadow-2xl shadow-sky-900/5 relative z-10">
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Inquiry Form</h3>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function About({ storeInfo, settings }) {
  const { t } = useTranslation()
  return (
    <section className="mx-auto mt-8 max-w-5xl px-4 pb-10">
      <div className="space-y-6">
        <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-sm">
          <SectionTitle label={t('OurStory')} title={t('StoryTitle')} subtitle={t('StorySubtitle')} />
          <div className="mb-6 text-slate-600 leading-relaxed">
            {storeInfo.description}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-sky-50 p-4"><p className="font-black">{t('DailyFreshArrival')}</p><p className="mt-1 text-sm text-slate-600">{t('DailyFreshArrivalDesc')}</p></div>
            <div className="rounded-2xl bg-sky-50 p-4"><p className="font-black">{t('TransparentPricing')}</p><p className="mt-1 text-sm text-slate-600">{t('TransparentPricingDesc')}</p></div>
            <div className="rounded-2xl bg-sky-50 p-4"><p className="font-black">{t('QuickSupport')}</p><p className="mt-1 text-sm text-slate-600">{t('QuickSupportDesc')}</p></div>
          </div>
        </div>

        {(settings?.exportCountries || settings?.certifications || settings?.companyInfo) && (
          <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-sm">
            <SectionTitle label={t('ExportInformation')} title="Global Presence & Standards" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {settings.exportCountries && (
                <div>
                  <p className="font-black text-sky-900">{t('ExportCountries')}</p>
                  <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{settings.exportCountries}</p>
                </div>
              )}
              {settings.certifications && (
                <div>
                  <p className="font-black text-sky-900">{t('Certifications')}</p>
                  <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{settings.certifications}</p>
                </div>
              )}
              {settings.companyInfo && (
                <div>
                  <p className="font-black text-sky-900">{t('CompanyInfo')}</p>
                  <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{settings.companyInfo}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Products({ products, storeInfo }) {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'In Stock', 'Low Stock', 'Out of Stock']
  
  const visibleProducts = useMemo(() => {
    return activeFilter === 'All' ? products : products.filter((item) => item.availability === activeFilter)
  }, [products, activeFilter])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle label={t('MarketMenu')} title={t('FishProductsListing')} subtitle={t('ListingSubtitle')} />
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {filters.map((item) => (
          <button 
            key={item} 
            onClick={() => setActiveFilter(item)} 
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              activeFilter === item 
                ? 'bg-sky-600 text-white shadow-md shadow-sky-100' 
                : 'border border-sky-100 bg-white text-sky-800 hover:bg-sky-50'
            }`}
          >
            {t(item)}
          </button>
        ))}
      </div>
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {visibleProducts.map((fish) => <FishCard key={fish.id} fish={fish} whatsappNumber={storeInfo?.whatsapp} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold">{t('FishNotFound')}</p>
        </div>
      )}
    </section>
  )
}

function ProductDetails({ products }) {
  const { t } = useTranslation()
  const { id } = useParams()
  const fish = useMemo(() => products.find((item) => String(item.id) === id), [id, products])
  if (!fish) return <section className="mx-auto max-w-6xl px-4 py-8">{t('FishNotFound')}</section>

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-10 md:grid-cols-2">
      <img src={makeImageUrl(fish.imageUrl)} alt={fish.name} className="h-96 w-full rounded-3xl border border-sky-100 object-cover shadow-sm" />
      <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">{t('ProductDetails')}</p>
        <h2 className="text-2xl font-bold text-sky-900">{fish.name}</h2>
        <p className="mt-2 leading-relaxed text-slate-600">{fish.description}</p>
        <p className="mt-3 text-lg font-semibold text-sky-800">{fish.price || t('PriceOnRequest')}</p>
        <p className="mt-2 text-sm text-slate-600">{t('LiveAvailability')}: {t(fish.availability)}</p>
        <a href={makeWhatsAppUrl(fish.name)} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-xl bg-sky-700 px-4 py-2.5 font-bold text-white hover:bg-sky-800">{t('InquireOnWhatsApp')}</a>
      </div>
    </section>
  )
}

function InquiryForm({ fishName = '' }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ buyer_name: '', phone: '', city_country: '', fish_interested_in: fishName, message: '' })
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await api.post('/admin/inquiries', form)
      setSent(true)
      setForm({ buyer_name: '', phone: '', city_country: '', fish_interested_in: '', message: '' })
    } catch (error) {
      alert('Failed to send inquiry')
    }
  }

  if (sent) return <div className="rounded-2xl bg-emerald-50 p-6 text-center font-bold text-emerald-800">{t('SendInquiry')} Success!</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder={t('BuyerName')}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
        value={form.buyer_name}
        onChange={e => setForm({ ...form, buyer_name: e.target.value })}
        required
      />
      <input
        placeholder={t('Phone')}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        placeholder={t('CityCountry')}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
        value={form.city_country}
        onChange={e => setForm({ ...form, city_country: e.target.value })}
      />
      <input
        placeholder={t('FishInterestedIn')}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
        value={form.fish_interested_in}
        onChange={e => setForm({ ...form, fish_interested_in: e.target.value })}
      />
      <textarea
        placeholder={t('Message')}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
        rows="3"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />
      <button type="submit" className="w-full rounded-xl bg-sky-700 py-3 font-bold text-white transition hover:bg-sky-800">
        {t('SendInquiry')}
      </button>
    </form>
  )
}

function Contact({ storeInfo }) {
  const { t } = useTranslation()
  return (
    <section className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-4 pb-10 md:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <SectionTitle label={t('ReachUs')} title={t('ContactUs')} subtitle={t('ContactSubtitle')} />
          <div className="space-y-2 text-slate-700">
            <p><span className="font-bold">{t('ShopName')}:</span> {storeInfo.name}</p>
            <p><span className="font-bold">{t('Owner')}:</span> {storeInfo.owner}</p>
            <p><span className="font-bold">{t('Call')}:</span> {storeInfo.phone}</p>
            <p><span className="font-bold">{t('Email')}:</span> {storeInfo.email}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={makeWhatsAppUrl('', storeInfo.whatsapp)} className="inline-block rounded-xl bg-emerald-600 px-4 py-2.5 font-bold text-white hover:bg-emerald-700">{t('OpenWhatsAppInquiry')}</a>
            <a href={storeInfo.map} target="_blank" rel="noreferrer" className="inline-block rounded-xl border border-sky-200 bg-white px-4 py-2.5 font-bold text-sky-700 hover:bg-sky-50">{t('ViewShopOnMaps')}</a>
          </div>
        </div>
        <iframe title="fish-market-location" src="https://www.google.com/maps?q=Mumbai+fish+market&output=embed" loading="lazy" className="h-80 w-full rounded-3xl border border-sky-100 shadow-sm" />
      </div>
      <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-black text-slate-900">{t('SendInquiry')}</h3>
        <InquiryForm />
      </div>
    </section>
  )
}

function Admin({ products, fetchProducts, settings, fetchSettings }) {
  const { t } = useTranslation()
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY) || '')
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('fish')
  const [inquiries, setInquiries] = useState([])
  const [gallery, setGallery] = useState([])

  // Fish Form
  const [editingId, setEditingId] = useState(null)
  const [fishForm, setFishForm] = useState({ name: '', description: '', price: '', availability: 'In Stock', imageUrl: '', imageFiles: [], isFeatured: 0 })

  // Settings Form
  const [settingsForm, setSettingsForm] = useState(settings)

  useEffect(() => {
    if (token) {
      fetchInquiries()
      fetchGallery()
    }
  }, [token])

  async function fetchInquiries() {
    try {
      const { data } = await api.get('/admin/inquiries', { headers: { Authorization: `Bearer ${token}` } })
      setInquiries(data)
    } catch (e) { console.error(e) }
  }

  async function fetchGallery() {
    try {
      const { data } = await api.get('/admin/gallery')
      setGallery(data)
    } catch (e) { console.error(e) }
  }

  async function handleLogin(event) {
    event.preventDefault()
    try {
      setError('')
      const { data } = await api.post('/auth/login', credentials)
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      setToken(data.token)
      setCredentials({ email: '', password: '' })
    } catch (loginError) {
      setError(loginError?.response?.data?.message || 'Login failed')
    }
  }

  // --- Fish Logic ---
  function resetFishForm() {
    setEditingId(null)
    setFishForm({ name: '', description: '', price: '', availability: 'In Stock', imageUrl: '', imageFiles: [], isFeatured: 0 })
  }

  function startEditFish(item) {
    setEditingId(item.id)
    setFishForm({
      name: item.name,
      description: item.description,
      price: item.price || '',
      availability: item.availability,
      imageUrl: item.imageUrl || '',
      imageFiles: [],
      isFeatured: item.isFeatured || 0
    })
  }

  async function saveFish(event) {
    event.preventDefault()
    const data = new FormData()
    data.append('name', fishForm.name)
    data.append('description', fishForm.description)
    data.append('price', fishForm.price)
    data.append('availability', fishForm.availability)
    data.append('imageUrl', fishForm.imageUrl)
    data.append('isFeatured', fishForm.isFeatured)
    if (fishForm.imageFiles.length > 0) {
      Array.from(fishForm.imageFiles).forEach(file => data.append('images', file))
    }

    const config = { headers: { Authorization: `Bearer ${token}` } }
    try {
      if (editingId) await api.put(`/fish/${editingId}`, data, config)
      else await api.post('/fish', data, config)
      resetFishForm()
      await fetchProducts()
    } catch (e) { alert('Failed to save fish') }
  }

  async function toggleFeature(item) {
    const data = new FormData()
    data.append('isFeatured', item.isFeatured ? 0 : 1)
    await api.put(`/fish/${item.id}`, data, { headers: { Authorization: `Bearer ${token}` } })
    await fetchProducts()
  }

  // --- Settings Logic ---
  async function updateSetting(key, value, file = null) {
    const data = new FormData()
    data.append('key', key)
    if (file) data.append('file', file)
    else data.append('value', value)
    await api.post('/admin/settings', data, { headers: { Authorization: `Bearer ${token}` } })
    await fetchSettings()
  }

  if (!token) {
    return (
      <section className="mx-auto mt-8 max-w-md rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-sky-900">{t('AdminLogin')}</h2>
        <p className="mt-1 text-sm text-slate-500">{t('AdminLoginDesc')}</p>
        <form onSubmit={handleLogin} className="mt-4 space-y-3">
          <input type="email" placeholder={t('Email')} value={credentials.email} onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2" required />
          <input type="password" placeholder={t('Password')} value={credentials.password} onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2" required />
          <button type="submit" className="w-full rounded-lg bg-sky-700 px-4 py-2.5 font-bold text-white">{t('Login')}</button>
          {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}
        </form>
      </section>
    )
  }

  const tabs = [
    { id: 'fish', label: '🐟 ' + t('AddFish') },
    { id: 'inquiries', label: '📥 ' + t('Inquiries') },
    { id: 'homepage', label: '🖼️ ' + t('HomepageManagement') },
    { id: 'gallery', label: '📸 ' + t('GalleryManagement') },
    { id: 'export', label: '🌍 ' + t('ExportInformation') },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap gap-2 border-b border-sky-100 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeTab === tab.id ? 'bg-sky-700 text-white' : 'bg-white text-sky-700 hover:bg-sky-50'}`}
          >
            {tab.label}
          </button>
        ))}
        <button onClick={() => { localStorage.removeItem(AUTH_TOKEN_KEY); setToken(''); }} className="ml-auto rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600">Logout</button>
      </div>

      {activeTab === 'fish' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-sky-900">{editingId ? t('EditFish') : t('AddFish')}</h2>
            <form onSubmit={saveFish} className="mt-4 space-y-3">
              <input type="text" placeholder={t('FishName')} value={fishForm.name} onChange={(e) => setFishForm({ ...fishForm, name: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2" required />
              <textarea placeholder={t('Description')} value={fishForm.description} onChange={(e) => setFishForm({ ...fishForm, description: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2" required />
              <input type="text" placeholder={t('Price')} value={fishForm.price} onChange={(e) => setFishForm({ ...fishForm, price: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
              <div className="flex gap-4">
                <select value={fishForm.availability} onChange={(e) => setFishForm({ ...fishForm, availability: e.target.value })} className="flex-1 rounded-lg border border-slate-200 px-3 py-2">
                  <option value="In Stock">{t('Available')}</option>
                  <option value="Out of Stock">{t('SoldOut')}</option>
                </select>
                <label className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                  <input type="checkbox" checked={fishForm.isFeatured === 1} onChange={e => setFishForm({ ...fishForm, isFeatured: e.target.checked ? 1 : 0 })} />
                  <span className="text-sm font-bold">{t('Featured')}</span>
                </label>
              </div>
              <input type="file" multiple accept="image/*" onChange={(e) => setFishForm({ ...fishForm, imageFiles: e.target.files })} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
              <div className="flex gap-2">
                <button type="submit" className="rounded-lg bg-sky-700 px-6 py-2.5 font-bold text-white">{editingId ? t('UpdateFish') : t('AddFish')}</button>
                {editingId && <button type="button" onClick={resetFishForm} className="rounded-lg border border-slate-300 px-6 py-2.5 font-semibold text-slate-700">{t('Cancel')}</button>}
              </div>
            </form>
          </div>
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-sky-900">{t('ManageFishListings')}</h2>
            <div className="mt-4 space-y-3">
              {products.map(item => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center gap-3">
                    <img src={makeImageUrl(item.imageUrl)} className="h-12 w-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className={`text-[10px] font-black uppercase ${item.availability === 'In Stock' ? 'text-emerald-600' : 'text-rose-600'}`}>{t(item.availability)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleFeature(item)} className={`rounded-lg px-3 py-1.5 text-xs font-bold ${item.isFeatured ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {item.isFeatured ? t('RemoveFeature') : t('Feature')}
                    </button>
                    <button onClick={() => startEditFish(item)} className="rounded-lg border border-sky-100 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50">{t('Edit')}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-sky-900">{t('Inquiries')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-sky-50 text-xs font-bold uppercase text-slate-400">
                <tr>
                  <th className="pb-3 pr-4">{t('BuyerName')}</th>
                  <th className="pb-3 pr-4">{t('Phone')}</th>
                  <th className="pb-3 pr-4">{t('FishInterestedIn')}</th>
                  <th className="pb-3 pr-4">{t('Message')}</th>
                  <th className="pb-3">{t('Status')}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {inquiries.map(inq => (
                  <tr key={inq.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-4 pr-4 font-bold text-slate-800">{inq.buyer_name} <br/><span className="text-[10px] font-normal text-slate-400">{inq.city_country}</span></td>
                    <td className="py-4 pr-4">{inq.phone}</td>
                    <td className="py-4 pr-4 font-semibold text-sky-700">{inq.fish_interested_in}</td>
                    <td className="max-w-xs py-4 pr-4 text-slate-600">{inq.message}</td>
                    <td className="py-4"><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">{inq.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'homepage' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-sky-900">{t('HomepageManagement')}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">{t('HeroImage')}</label>
                <input type="file" onChange={e => updateSetting('heroImage', '', e.target.files[0])} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">{t('CompanyDescription')}</label>
                <textarea 
                  value={settingsForm.companyDescription || ''} 
                  onChange={e => setSettingsForm({ ...settingsForm, companyDescription: e.target.value })}
                  onBlur={e => updateSetting('companyDescription', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows="4" 
                />
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-sky-900">{t('Contact')} & {t('WhatsApp')}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">{t('WhatsAppNumber')}</label>
                <input 
                  type="text" 
                  value={settingsForm.whatsappNumber || ''} 
                  onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  onBlur={e => updateSetting('whatsappNumber', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" 
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">{t('Call')}</label>
                <input 
                  type="text" 
                  value={settingsForm.storePhone || ''} 
                  onChange={e => setSettingsForm({ ...settingsForm, storePhone: e.target.value })}
                  onBlur={e => updateSetting('storePhone', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-sky-900">{t('GalleryManagement')}</h2>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <input type="file" onChange={async e => {
              const file = e.target.files[0]
              if (!file) return
              const data = new FormData()
              data.append('image', file)
              data.append('category', 'Catch')
              await api.post('/admin/gallery', data, { headers: { Authorization: `Bearer ${token}` } })
              fetchGallery()
            }} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            {gallery.map(item => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl border border-sky-50">
                <img src={makeImageUrl(item.image_url)} className="h-full w-full object-cover" />
                <button 
                  onClick={async () => { await api.delete(`/admin/gallery/${item.id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchGallery(); }}
                  className="absolute inset-0 flex items-center justify-center bg-rose-600/80 text-white opacity-0 transition group-hover:opacity-100"
                >
                  {t('Delete')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-sky-900">{t('ExportCountries')}</h2>
            <textarea 
              value={settingsForm.exportCountries || ''} 
              onChange={e => setSettingsForm({ ...settingsForm, exportCountries: e.target.value })}
              onBlur={e => updateSetting('exportCountries', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows="6" placeholder="e.g. USA, Japan, UAE" 
            />
          </div>
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-sky-900">{t('Certifications')}</h2>
            <textarea 
              value={settingsForm.certifications || ''} 
              onChange={e => setSettingsForm({ ...settingsForm, certifications: e.target.value })}
              onBlur={e => updateSetting('certifications', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows="6" placeholder="e.g. ISO 9001, HACCP" 
            />
          </div>
          <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-sky-900">{t('CompanyInfo')}</h2>
            <textarea 
              value={settingsForm.companyInfo || ''} 
              onChange={e => setSettingsForm({ ...settingsForm, companyInfo: e.target.value })}
              onBlur={e => updateSetting('companyInfo', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows="6" 
            />
          </div>
        </div>
      )}
    </section>
  )
}

function AppContent() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchProducts() {
    try {
      const { data } = await api.get('/fish')
      setProducts(data)
    } finally {
      setLoading(false)
    }
  }

  async function fetchSettings() {
    try {
      const { data } = await api.get('/admin/settings')
      setSettings(data)
    } catch (error) {
      console.error('Failed to fetch settings')
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchSettings()
  }, [])

  const storeInfo = {
    name: settings.storeName || STORE_NAME,
    owner: settings.storeOwner || STORE_OWNER,
    phone: settings.storePhone || STORE_PHONE_DISPLAY,
    email: settings.storeEmail || STORE_EMAIL,
    whatsapp: settings.whatsappNumber || WHATSAPP_NUMBER,
    map: settings.mapLink || STORE_MAP_LINK,
    description: settings.companyDescription || '',
    heroImage: settings.heroImage || '',
  }

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const q = searchQuery.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  return (
    <Shell storeInfo={storeInfo} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      {loading ? <div className="mx-auto mt-10 max-w-6xl px-4 text-sm font-semibold text-slate-500">{t('Loading')}</div> : null}
      <Routes>
          <Route path="/" element={<Home products={filteredProducts} storeInfo={storeInfo} isSearching={!!searchQuery} />} />
          <Route path="/about" element={<About storeInfo={storeInfo} settings={settings} />} />
          <Route path="/products" element={<Products products={filteredProducts} storeInfo={storeInfo} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} />} />
        <Route path="/contact" element={<Contact storeInfo={storeInfo} />} />
        <Route path="/admin" element={<Admin products={products} fetchProducts={fetchProducts} settings={settings} fetchSettings={fetchSettings} />} />
      </Routes>
    </Shell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
