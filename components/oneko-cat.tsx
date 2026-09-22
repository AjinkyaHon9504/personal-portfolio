'use client'

import { useEffect, useRef } from 'react'

const FRAME_SIZE = 32
const MOBILE_BREAKPOINT = 768

const SPRITE_SETS: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

/**
 * A running cat that chases the cursor on desktop (sprite-animated oneko.js style).
 * On mobile/touch, there's no cursor to chase, so it sits in the bottom-left corner instead.
 */
export function OnekoCat() {
  const nekoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const nekoEl = nekoRef.current
    if (!nekoEl) return

    let rafId = 0
    let lastFrameTimestamp = 0

    const setSprite = (name: string, frame: number) => {
      const set = SPRITE_SETS[name]
      const [x, y] = set[frame % set.length]
      nekoEl.style.backgroundPosition = `${x * FRAME_SIZE}px ${y * FRAME_SIZE}px`
    }

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT

    if (isMobile) {
      nekoEl.style.left = '16px'
      nekoEl.style.bottom = '16px'
      nekoEl.style.top = 'auto'

      let idleFrame = 0
      let idleAnimation: string | null = null

      const idleTick = (timestamp: number) => {
        if (timestamp - lastFrameTimestamp > 200) {
          lastFrameTimestamp = timestamp
          idleFrame += 1

          if (idleAnimation === null && Math.floor(Math.random() * 40) === 0) {
            idleAnimation = Math.random() > 0.5 ? 'scratchSelf' : 'sleeping'
          }

          if (idleAnimation === 'scratchSelf') {
            setSprite('scratchSelf', idleFrame)
            if (idleFrame > 9) {
              idleAnimation = null
              idleFrame = 0
            }
          } else if (idleAnimation === 'sleeping') {
            setSprite('sleeping', Math.floor(idleFrame / 4))
            if (idleFrame > 40) {
              idleAnimation = null
              idleFrame = 0
            }
          } else {
            setSprite('idle', 0)
          }
        }
        rafId = window.requestAnimationFrame(idleTick)
      }
      rafId = window.requestAnimationFrame(idleTick)

      return () => window.cancelAnimationFrame(rafId)
    }

    // Desktop: chase the mouse cursor, oneko.js style
    let nekoPosX = window.innerWidth / 2
    let nekoPosY = window.innerHeight / 2
    let mousePosX = nekoPosX
    let mousePosY = nekoPosY
    let frameCount = 0
    let idleTime = 0
    let idleAnimation: string | null = null
    let idleAnimationFrame = 0
    const nekoSpeed = 10

    nekoEl.style.left = `${nekoPosX - 16}px`
    nekoEl.style.top = `${nekoPosY - 16}px`
    nekoEl.style.bottom = 'auto'

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX
      mousePosY = event.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const resetIdleAnimation = () => {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    const idle = () => {
      idleTime += 1
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const available = ['sleeping', 'scratchSelf']
        if (nekoPosX < 32) available.push('scratchWallW')
        if (nekoPosY < 32) available.push('scratchWallN')
        if (nekoPosX > window.innerWidth - 32) available.push('scratchWallE')
        if (nekoPosY > window.innerHeight - 32) available.push('scratchWallS')
        idleAnimation = available[Math.floor(Math.random() * available.length)]
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0)
            break
          }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
          if (idleAnimationFrame > 192) resetIdleAnimation()
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame)
          if (idleAnimationFrame > 9) resetIdleAnimation()
          break
        default:
          setSprite('idle', 0)
          return
      }
      idleAnimationFrame += 1
    }

    const frameTick = () => {
      frameCount += 1
      const diffX = nekoPosX - mousePosX
      const diffY = nekoPosY - mousePosY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      if (distance < nekoSpeed || distance < 48) {
        idle()
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7)
        idleTime -= 1
        return
      }

      let direction = ''
      direction += diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      setSprite(direction || 'idle', frameCount)

      nekoPosX -= (diffX / distance) * nekoSpeed
      nekoPosY -= (diffY / distance) * nekoSpeed
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)

      nekoEl.style.left = `${nekoPosX - 16}px`
      nekoEl.style.top = `${nekoPosY - 16}px`
    }

    const onAnimationFrame = (timestamp: number) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp
        frameTick()
      }
      rafId = window.requestAnimationFrame(onAnimationFrame)
    }
    rafId = window.requestAnimationFrame(onAnimationFrame)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={nekoRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: FRAME_SIZE,
        height: FRAME_SIZE,
        backgroundImage: 'url(/cat/oneko.gif)',
        imageRendering: 'pixelated',
        pointerEvents: 'none',
        zIndex: 60,
      }}
    />
  )
}
