'use client'

import { useEffect, useRef } from 'react'
import { animate, createScope, onScroll, type Scope } from 'animejs'
import { cloudinaryPosterUrl, cloudinaryVideoUrl } from '@/lib/cloudinary'

interface VideoTileProps {
  publicId: string
  label: string
  posterOverride?: string
  aspectClassName?: string
  className?: string
  movementVariant?: number
  onOpen: (publicId: string, label: string) => void
}

const MOVEMENT_VARIANTS: { scale: [number, number]; translateX: [string, string]; translateY: [string, string] }[] = [
  { scale: [1, 1.1], translateX: ['0%', '0%'], translateY: ['0%', '0%'] },
  { scale: [1.06, 1.06], translateX: ['-3%', '3%'], translateY: ['0%', '0%'] },
  { scale: [1.1, 1], translateX: ['0%', '0%'], translateY: ['-2.5%', '2.5%'] },
  { scale: [1.04, 1.04], translateX: ['2%', '-2%'], translateY: ['1%', '-1%'] },
]

export function VideoTile({
  publicId,
  label,
  posterOverride,
  aspectClassName = 'aspect-[3/4]',
  className = '',
  movementVariant = 0,
  onOpen,
}: VideoTileProps) {
  const rootRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope: Scope = createScope().add(() => {
      const video = videoRef.current
      if (video) {
        const variant = MOVEMENT_VARIANTS[movementVariant % MOVEMENT_VARIANTS.length]
        animate(video, {
          ...variant,
          duration: 8000 + (movementVariant % MOVEMENT_VARIANTS.length) * 1200,
          direction: 'alternate',
          loop: true,
          ease: 'inOutSine',
        })
      }

      const reveal = revealRef.current
      const root = rootRef.current
      if (reveal && root) {
        animate(reveal, {
          opacity: [1, 0],
          duration: 1000,
          ease: 'outQuad',
          autoplay: onScroll({ target: root, enter: 'bottom-=40 top' }),
        })
      }
    })

    return () => scope.revert()
  }, [movementVariant])

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {})
  }

  const handleLeave = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <button
      ref={rootRef}
      type="button"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(publicId, label)}
      className={`group relative overflow-hidden bg-gray-950 w-full text-left ${aspectClassName} ${className}`}
      aria-label={`Play ${label}`}
    >
      <video
        ref={videoRef}
        src={cloudinaryVideoUrl(publicId)}
        poster={posterOverride ?? cloudinaryPosterUrl(publicId)}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div ref={revealRef} className="pointer-events-none absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-sm font-semibold text-white drop-shadow">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </button>
  )
}
