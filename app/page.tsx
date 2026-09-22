'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { animate, createScope, onScroll, stagger, type Scope } from 'animejs'
import { VideoTile } from '@/components/video-tile'
import { VideoLightbox } from '@/components/video-lightbox'

const ARTIST_VIDEOS = [
  'SaveInta.com_AQMsPd1G-4XEx6uw0H1ZHTYTEmhsdl8xOmfHGMry6ydQ4axbZONmJairjLUghmD5_23JuRYy4I30YdZUSYoR_AsBSzqnDIvdrgg6sOQ',
  'SaveInta.com_AQNfi6fGDEisQ0006z8njCGvVQ0t6BkMXvE2ZrGicjTEonqgy7MxzrCmJYsJfU_y5bThGGd0bYqUvMBt3GG1ggAg3shlZpoxxQN42mM',
  'SaveInta.com_AQO5LrD6KN7LIw9wzKCsKokVcGtUah61tX-DV5rX6PcGudi7E-pO3KvGYSD_uck0Dakh2UzW4FuOmiSW1rHhgecvn3C_NYgIJ9gUYqo',
  'SaveInta.com_AQMtXPLEUFw87ov8Ei3LWO3rYsjayrXP2d4t1DDMD4LqXz1psTcb_aXs_0GfTH4OXcH0psU9trkd85vXf6IcRSu3w_F4yXcng1AHQXQ',
  'SaveInta.com_AQOQ1CP5hLH6OzjOSJhNRJShgalWaRihTVCcOzOsi7pkHpE-fP4rhQs9_opKuplvt0MDo73PmZspXabZna9aLyr0VD4EGY5Eel5sBqA',
  'SaveInta.com_AQN-5-b3CDCABNAt4y7THTdXsSj0Jcrymv_x2kbxaiNM_Gdy_F6JR4c9gqqE7YxHGW_WuS5fngNBlOWWr8-6p649',
  'SaveInta.com_AQM8X_c777mBtiLfnVUYTdhBQ6IrussgIc2Ok6iOa9mrCSa-Uydpr4MoQiowZmumJ34E6mrI4rF3csCZH3FSsf08cBDInLdlek-FzyA',
]

const AFTERMOVIE_VIDEOS = [
  'SaveInta.com_AQMOaPK2BSZh8d6PEVoIpWlvKvlyYU0pVBHMDaJO1uwHV4VvfkrVRxtDF_FeIl-Jqw3Xjo7UMl2pkbjPrxjpDVCzCNkPNvAWzVVsL4E',
  'SaveInta.com_AQMRo5ibkgYkx1sjMM-s03Q4cO0t_KUDYuKxB1Qq3Luk7yPy-32VBEj-9iaRnLonVkzvOk8JRBzcWMN4qJqMliXHhKHDIbxxo4uBj6c',
]

const ANIMATED_3D_VIDEO = 'SaveInta.com_AQPEt1fogonCouOMR1P9XZEC9UzqWsr-siGZw7Cp1Pv42Unkzz6QAnGRqH6ZBwiq3Ab0AX1ez8bNy6MCAIYPwyv-r_bJ7SFIFP0HMPA'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState('Ajinkya Hon')
  const [isHacking, setIsHacking] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [showScrollTop, setShowScrollTop] = useState(false)

  const navRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const artistGridRef = useRef<HTMLDivElement>(null)
  const aftermovieGridRef = useRef<HTMLDivElement>(null)
  const animated3dRef = useRef<HTMLDivElement>(null)

  const [lightbox, setLightbox] = useState<{ publicId: string; label: string } | null>(null)
  const openVideo = (publicId: string, label: string) => setLightbox({ publicId, label })
  const closeVideo = () => setLightbox(null)

  useEffect(() => {
    const scope: Scope = createScope().add(() => {
      const navLinks = navRef.current?.querySelectorAll('.nav-link')
      if (navLinks && navLinks.length) {
        animate(navLinks, {
          opacity: [0, 1],
          translateY: [-16, 0],
          delay: stagger(90, { start: 200 }),
          duration: 600,
          ease: 'outQuad',
        })
      }

      if (taglineRef.current) {
        animate(taglineRef.current.children, {
          opacity: [0, 1],
          translateX: [-24, 0],
          delay: stagger(120, { start: 450 }),
          duration: 700,
          ease: 'outQuad',
        })
      }
    })

    return () => scope.revert()
  }, [])

  useEffect(() => {
    const scope: Scope = createScope().add(() => {
      const experienceEl = experienceRef.current
      if (experienceEl) {
        const columns = experienceEl.querySelectorAll('.exp-column')
        columns.forEach((column, columnIndex) => {
          const items = column.querySelectorAll('.exp-item')
          animate(items, {
            opacity: [0, 1],
            translateY: [24, 0],
            delay: stagger(70, { start: columnIndex * 120 }),
            duration: 600,
            ease: 'outQuad',
            autoplay: onScroll({ target: experienceEl, enter: 'bottom-=80 top' }),
          })
        })
      }
    })

    return () => scope.revert()
  }, [])

  useEffect(() => {
    const scope: Scope = createScope().add(() => {
      const artistGrid = artistGridRef.current
      if (artistGrid) {
        animate(artistGrid.querySelectorAll('.portfolio-tile'), {
          opacity: [0, 1],
          translateY: [40, 0],
          delay: stagger(80),
          duration: 700,
          ease: 'outQuad',
          autoplay: onScroll({ target: artistGrid, enter: 'bottom-=60 top' }),
        })
      }

      const aftermovieGrid = aftermovieGridRef.current
      if (aftermovieGrid) {
        animate(aftermovieGrid.querySelectorAll('.portfolio-tile'), {
          clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
          delay: stagger(150),
          duration: 900,
          ease: 'outQuart',
          autoplay: onScroll({ target: aftermovieGrid, enter: 'bottom-=60 top' }),
        })
      }

      const animated3d = animated3dRef.current
      if (animated3d) {
        animate(animated3d, {
          opacity: [0, 1],
          scale: [0.85, 1],
          rotate: [-2, 0],
          duration: 800,
          ease: 'outBack',
          autoplay: onScroll({ target: animated3d, enter: 'bottom-=60 top' }),
        })
      }
    })

    return () => scope.revert()
  }, [])

  const pulseOnHover = (event: React.MouseEvent<HTMLElement>) => {
    animate(event.currentTarget, {
      scale: [1, 1.12, 1],
      duration: 500,
      ease: 'outElastic(1, .6)',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)
    
    const originalText = 'Ajinkya Hon'
    const chars = '01!@#$%^&*(){}[]<>?/\\|~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let iterations = 0
    
    const interval = setInterval(() => {
      setHackText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterations) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      
      iterations += 0.15
      
      if (iterations >= originalText.length) {
        clearInterval(interval)
        setHackText(originalText)
        setIsHacking(false)
      }
    }, 60)
  }

  const resetText = () => {
    if (!isHacking) {
      setHackText('Ajinkya Hon')
    }
  }

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / heroHeight, 1)
  
  const imageScale = Math.max(0.65, 1 - (scrollProgress * 0.35))
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const imageTranslateY = 0
  const imageTranslateX = isMobile ? (-scrollProgress * 30) : 0
  
  const aboutMeProgress = Math.max(0, Math.min(1, (scrollY - heroHeight * 0.5) / (heroHeight * 0.3)))
  
  const navOpacity = scrollY > 100 ? 0.4 : 1

  const contactSection = typeof document !== 'undefined' ? document.querySelector('#contact') : null
  const contactSectionTop = contactSection?.getBoundingClientRect().top ?? Infinity
  const isInContactSection = contactSectionTop <= 100
  
  const navTextColor = isInContactSection ? 'text-white' : 'text-foreground'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }
  
  const heroContentOpacity = Math.max(0, 1 - (scrollProgress * 2))

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white">
      <button
        onClick={scrollToTop}
        onMouseEnter={pulseOnHover}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] bg-black text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Hero Section with sticky container */}
      <div id="home" className="relative" style={{ height: '150vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="grid lg:grid-cols-2 h-full">
            <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative">
              <div 
                className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4"
                style={{
                  transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
                  transformOrigin: 'center center',
                }}
              >
                <Image
                  src="/images/ajinkya-hero.webp"
                  alt="Ajinkya Hon"
                  fill
                  className="object-cover transition-all duration-700 group-hover:grayscale"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-16 relative">
              <nav
                ref={navRef}
                className="fixed top-4 md:top-8 right-4 md:right-8 lg:right-16 flex flex-col items-end gap-1 md:gap-4 z-[9999] transition-all duration-500 pointer-events-auto"
                style={{ opacity: navOpacity }}
              >
                <Link
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className={`nav-link text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Home
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link
                  href="#me"
                  onClick={(e) => handleNavClick(e, '#me')}
                  className={`nav-link text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Me
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link
                  href="#portfolio"
                  onClick={(e) => handleNavClick(e, '#portfolio')}
                  className={`nav-link text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Portfolio
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link
                  href="#experience"
                  onClick={(e) => handleNavClick(e, '#experience')}
                  className={`nav-link text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Experience
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className={`nav-link text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Services
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className={`nav-link text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Get in touch
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
              </nav>

              <div 
                className="flex-1 flex flex-col justify-center transition-opacity duration-300 pt-24 md:pt-40 lg:pt-48"
                style={{ opacity: heroContentOpacity }}
              >
                <h1 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 md:mb-6 cursor-pointer font-mono glitch-container group/name"
                  onMouseEnter={startHackEffect}
                  onMouseLeave={resetText}
                >
                  <span className="glitch-text" data-text={hackText}>{hackText}</span>
                </h1>
                
                <div ref={taglineRef} className="space-y-1 md:space-y-2 mb-6 md:mb-12">
                  <p className="text-base md:text-xl text-muted-foreground">
                    Video Editor & Visual Media Specialist
                  </p>
                  <p className="text-sm md:text-lg text-muted-foreground font-semibold">
                    3+ Years Crafting Visual Stories
                  </p>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    Based in Pune, Maharashtra
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 group cursor-pointer">
                  <div className="flex items-center gap-3 md:gap-4">
                    <h2 className="text-xl md:text-3xl font-bold text-foreground transition-transform duration-300 group-hover:scale-110 origin-left">
                      Let's create
                    </h2>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-foreground md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="h-1 w-20 md:w-32 bg-foreground transition-all duration-500 ease-out group-hover:w-32 md:group-hover:w-48"></div>
                </div>
              </div>
              
              <div id="me"></div>
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-16 transition-all duration-1000 ease-out"
                style={{
                  opacity: aboutMeProgress,
                  transform: `translateY(${(1 - aboutMeProgress) * 50}px)`,
                  pointerEvents: aboutMeProgress > 0.5 ? 'auto' : 'none',
                }}
              >
                <div className="space-y-2 md:space-y-6">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
                    AJINKYA HON
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl font-bold text-black tracking-wide">
                    VIDEO EDITOR & VISUAL STORYTELLER
                  </p>
                  <p className="text-xs md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    Over the last three years, I've worked across artist management agencies, brands, college festivals, and digital platforms to create engaging visual content that drives audience engagement and brand visibility — from artist promotions and concert coverage to large-scale festival campaigns and social media content production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        id="portfolio"
        className="bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-12 md:mb-16 lg:mb-20">
            Portfolio
          </h2>

          <div className="mb-16 md:mb-20">
            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-6 md:mb-8">
              Artist Content
            </h3>
            <div ref={artistGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {ARTIST_VIDEOS.map((publicId, index) => (
                <VideoTile
                  key={publicId}
                  publicId={publicId}
                  label={`Artist Reel ${String(index + 1).padStart(2, '0')}`}
                  aspectClassName="aspect-[3/4]"
                  className="portfolio-tile"
                  movementVariant={index}
                  onOpen={openVideo}
                />
              ))}
            </div>
          </div>

          <div className="mb-16 md:mb-20">
            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-6 md:mb-8">
              Aftermovies
            </h3>
            <div ref={aftermovieGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {AFTERMOVIE_VIDEOS.map((publicId, index) => (
                <VideoTile
                  key={publicId}
                  publicId={publicId}
                  label={`Event Aftermovie ${String(index + 1).padStart(2, '0')}`}
                  aspectClassName="aspect-video"
                  className="portfolio-tile"
                  movementVariant={index + 2}
                  onOpen={openVideo}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-6 md:mb-8">
              3D Animated
            </h3>
            <div ref={animated3dRef} className="max-w-2xl">
              <VideoTile
                publicId={ANIMATED_3D_VIDEO}
                label="3D Animated Reel"
                aspectClassName="aspect-[3/4]"
                movementVariant={0}
                onOpen={openVideo}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="bg-white px-6 md:px-12 lg:px-20 py-20 border-t border-gray-100">
        <div ref={experienceRef} className="max-w-[1300px] mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-20 text-black">
            Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="exp-column">
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 md:mb-6">
                Clients & Brands
              </h3>
              <ul className="space-y-3">
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Cosa Nostra</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">TribeVibe</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Fitspire</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Multiple YouTube Channels</li>
              </ul>
            </div>

            <div className="exp-column">
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 md:mb-6">
                Festivals & Events Covered
              </h3>
              <ul className="space-y-3">
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Saturnalia</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Retina — AIIMS Bhopal</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Plinth — LNMIIT Tech Fest</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Cogni — IIT Roorkee</li>
              </ul>
            </div>

            <div className="exp-column">
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 md:mb-6">
                Artist Collaborations
              </h3>
              <ul className="space-y-3">
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Seedhe Maut</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Amaal Mallik</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Aditya Rikhari</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Naalayak</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Shalmali Kholgade</li>
                <li className="exp-item text-lg md:text-xl font-semibold text-black">Bismil</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="min-h-screen bg-white px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-[1300px] mx-auto">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-black text-center"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 2200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 2200) / 12)}px)`
            }}
          >
            Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Service 1 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2400) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2400) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                01
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Short-Form Video Editing
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Instagram Reels and YouTube Shorts crafted for maximum engagement, retention, and platform-native pacing.
              </p>
            </div>

            {/* Service 2 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2500) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2500) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                02
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Event Aftermovies
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Cinematic recaps of festivals, concerts, and college fests that capture the full energy of the moment.
              </p>
            </div>

            {/* Service 3 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2600) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2600) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                03
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Concert & Artist Content
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                On-ground coverage and edits for live performances, artist promotions, and tour content.
              </p>
            </div>

            {/* Service 4 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2700) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2700) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                04
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Motion Graphics
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Custom animated elements, titles, and graphics that elevate every edit.
              </p>
            </div>

            {/* Service 5 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2800) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2800) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                05
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Brand Campaign Edits
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Promotional videos built around brand storytelling that drives audience engagement.
              </p>
            </div>

            {/* Service 6 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2900) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2900) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                06
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Social Media Content Strategy
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Content planning and edits tailored to platform-specific algorithms and audience behavior.
              </p>
            </div>

            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 3000) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 3000) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                07
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Promotional Videos
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                High-impact edits for product launches, events, and marketing campaigns.
              </p>
            </div>

            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 3100) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 3100) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                08
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Artist Reels
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Collaborative content for musicians and performers, from teasers to full releases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3200) / 12)}px)`
            }}
          >
            Get in touch
          </h2>

          <p 
            className="text-lg md:text-xl text-gray-400 mb-12 md:mb-16 max-w-2xl"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3300) / 300)),
              transform: `translateY(${Math.max(0, 30 - (scrollY - 3300) / 10)}px)`
            }}
          >
            Have a project in mind? Let's collaborate and bring your ideas to life.
          </p>

          <form 
            onSubmit={handleSubmit}
            className="space-y-8"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3400) / 300)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3400) / 10)}px)`
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 group">
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-400 group-focus-within:text-white transition-colors">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-700 focus:border-white py-3 text-lg md:text-xl outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-3 group">
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-400 group-focus-within:text-white transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-700 focus:border-white py-3 text-lg md:text-xl outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-3 group">
              <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-400 group-focus-within:text-white transition-colors">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full bg-transparent border-b-2 border-gray-700 focus:border-white py-3 text-lg md:text-xl outline-none resize-none transition-all duration-300"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                onMouseEnter={pulseOnHover}
                className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-bold bg-white text-black px-10 py-5 hover:bg-gray-200 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Send Message</span>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:stroke-black"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </form>

          <div 
            className="mt-16 md:mt-20 pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3600) / 300)),
            }}
          >
            <div className="space-y-2">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Direct Contact</p>
              <Link
                href="mailto:ajinkyahon090504@gmail.com"
                className="text-xl md:text-2xl hover:text-gray-400 transition-colors block"
              >
                ajinkyahon090504@gmail.com
              </Link>
              <Link
                href="tel:+918530251177"
                className="text-lg md:text-xl text-gray-400 hover:text-white transition-colors block"
              >
                +91 85302 51177
              </Link>
              <p className="text-lg md:text-xl text-gray-400">Pune, Maharashtra</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Follow</p>
              <div className="flex gap-6">
                <Link
                  href="https://www.instagram.com/honajinkya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400 transition-colors"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ajinkyahon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400 transition-colors"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoLightbox
        publicId={lightbox?.publicId ?? null}
        label={lightbox?.label ?? ''}
        onClose={closeVideo}
      />
    </main>
  )
}
