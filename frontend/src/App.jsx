import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowDown, 
  ChevronRight, 
  Globe, 
  Mail, 
  Phone, 
  Waves, 
  Anchor, 
  ShieldCheck, 
  Compass,
  Menu,
  X
} from 'lucide-react'
import { SITE_INFO, translations } from './siteData'
import { useLanguage } from './LanguageContext'
import founderImg from './assets/founder.jpg'

function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#heritage', label: 'Heritage' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? 'nav-glass py-4' : 'bg-transparent py-8'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand */}
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-all group-hover:bg-white/10">
            <Anchor size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-playfair text-xl font-bold tracking-tight text-white">{SITE_INFO.shopName}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Since 1998</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-12 lg:flex">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            {['en', 'mr', 'hi'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[10px] font-black tracking-widest transition-all ${
                  language === lang ? 'text-white underline underline-offset-8' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="text-white lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-full bg-navy p-8 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-white/60"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-6 border-t border-white/10 pt-6">
                {['en', 'mr', 'hi'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setMobileMenuOpen(false)
                    }}
                    className={`text-xs font-black ${language === lang ? 'text-white' : 'text-white/30'}`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  const { copy } = useLanguage()

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-6 pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Maritime Excellence Since 1998</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-playfair text-6xl font-medium leading-[1.1] text-white sm:text-8xl lg:text-9xl"
        >
          {copy.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl text-lg font-medium leading-relaxed text-white/40 sm:text-xl lg:text-2xl"
        >
          {copy.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-col justify-center gap-6 sm:flex-row"
        >
          <a
            href="#gallery"
            className="inline-flex min-h-[70px] items-center justify-center rounded-full bg-white px-10 text-xs font-black uppercase tracking-[0.2em] text-navy transition-all hover:scale-105"
          >
            Explore Collection
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-[70px] items-center justify-center rounded-full border border-white/20 px-10 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/5"
          >
            Direct Inquiry
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  )
}

function Philosophy() {
  const { copy } = useLanguage()
  const icons = [Waves, Globe, ShieldCheck, Compass]

  return (
    <section id="philosophy" className="bg-navy py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24 text-center">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Standard of Excellence</p>
          <h2 className="font-playfair text-5xl font-medium text-white sm:text-7xl lg:text-8xl">{copy.philosophyTitle}</h2>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/40">{copy.philosophySubtitle}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {copy.pillars.map((pillar, idx) => {
            const Icon = icons[idx]
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 p-10 transition-all hover:bg-white/[0.08]"
              >
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white transition-all group-hover:scale-110">
                  <Icon size={28} />
                </div>
                <h3 className="mb-4 text-xl font-bold text-white">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-white/40">{pillar.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Founder() {
  const { copy } = useLanguage()

  return (
    <section id="heritage" className="relative overflow-hidden bg-navy py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[3rem] border border-white/10" />
            <img 
              src={founderImg} 
              alt="The Founder" 
              className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="absolute bottom-10 left-10 rounded-2xl bg-navy/80 p-6 backdrop-blur-md">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">The Founder</p>
              <h3 className="font-playfair mt-2 text-2xl font-medium text-white">{copy.founderTitle}</h3>
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="space-y-12">
            <div>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Our Legacy</p>
              <h2 className="font-playfair text-5xl font-medium text-white sm:text-7xl lg:text-8xl">{copy.heritageTitle}</h2>
            </div>
            
            <p className="text-xl leading-relaxed text-white/40">{copy.heritageBody}</p>

            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
              {copy.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-playfair text-5xl font-medium text-white lg:text-6xl">{stat.value}</div>
                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white"
            >
              Initiate Collaboration <ChevronRight size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const { copy } = useLanguage()
  
  // Use high-quality placeholder images for a premium look
  const images = [
    "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504362302022-840557362840?auto=format&fit=crop&w=1200&q=80"
  ]

  return (
    <section id="gallery" className="bg-navy py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-24 text-center">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">The Visual Journey</p>
          <h2 className="font-playfair text-5xl font-medium text-white sm:text-7xl lg:text-8xl">{copy.galleryTitle}</h2>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/40">{copy.gallerySubtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-[2.5rem]"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-navy/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { copy } = useLanguage()

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-32 lg:py-48">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
        <p className="mb-8 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Direct Engagement</p>
        <h2 className="font-playfair mb-16 text-5xl font-medium text-white sm:text-7xl lg:text-8xl">{copy.collaborationTitle}</h2>
        
        <a 
          href={`tel:${SITE_INFO.phone}`}
          className="font-playfair block text-5xl font-medium text-white transition-all hover:scale-105 sm:text-8xl lg:text-9xl"
        >
          {SITE_INFO.phone}
        </a>
        
        <div className="mt-12 flex justify-center gap-4">
          <Mail className="text-white/20" size={20} />
          <span className="text-xl font-medium text-white/40">{SITE_INFO.email}</span>
        </div>

        <div className="mt-24 flex flex-col justify-center gap-6 sm:flex-row">
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="inline-flex min-h-[70px] items-center justify-center rounded-full bg-white px-12 text-xs font-black uppercase tracking-[0.2em] text-navy"
          >
            Direct Inquiry
          </a>
          <a
            href={SITE_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[70px] items-center justify-center rounded-full border border-white/20 px-12 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/5"
          >
            WhatsApp Message
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { copy } = useLanguage()

  return (
    <footer className="border-t border-white/5 bg-navy py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <a href="#" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white">
                <Anchor size={24} />
              </div>
              <span className="font-playfair text-2xl font-bold text-white">{SITE_INFO.shopName}</span>
            </a>
            <p className="max-w-sm text-lg leading-relaxed text-white/30">
              Crafting a legacy of maritime excellence. We bridge the world's finest oceans to your table with uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Navigation</h4>
              <ul className="space-y-4">
                {['Philosophy', 'Heritage', 'Gallery', 'Contact'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/50 transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Contact</h4>
              <ul className="space-y-4">
                <li><a href={`tel:${SITE_INFO.phone}`} className="text-sm font-medium text-white/50 transition-colors hover:text-white">{SITE_INFO.phone}</a></li>
                <li><span className="text-sm font-medium text-white/50">{SITE_INFO.email}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-32 flex flex-col justify-between gap-8 border-t border-white/5 pt-12 sm:flex-row sm:items-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
            © 2025 Maritime Excellence — Sameer Qureshi & brother's
          </p>
          <div className="flex gap-10">
            <a href="https://godawarifish.vercel.app/" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/40">
              godawarifish.vercel.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-navy selection:bg-white/10 selection:text-white">
      <Navbar />
      <Hero />
      <Philosophy />
      <Founder />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}
