'use client'

import { useRef } from 'react'
import { cloudinaryPosterUrl, cloudinaryVideoUrl } from '@/lib/cloudinary'

interface VideoTileProps {
  publicId: string
  label: string
  posterOverride?: string
  aspectClassName?: string
  className?: string
  onOpen: (publicId: string, label: string) => void
}

export function VideoTile({
  publicId,
  label,
  posterOverride,
  aspectClassName = 'aspect-[3/4]',
  className = '',
  onOpen,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
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
