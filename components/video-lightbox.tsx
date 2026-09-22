'use client'

import { useEffect } from 'react'
import { cloudinaryVideoUrl } from '@/lib/cloudinary'

interface VideoLightboxProps {
  publicId: string | null
  label: string
  onClose: () => void
}

export function VideoLightbox({ publicId, label, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!publicId) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [publicId, onClose])

  if (!publicId) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 text-3xl text-white hover:text-gray-300 md:right-8 md:top-8"
      >
        &times;
      </button>
      <video
        key={publicId}
        src={cloudinaryVideoUrl(publicId)}
        controls
        autoPlay
        playsInline
        className="max-h-[85vh] max-w-full rounded"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )
}
