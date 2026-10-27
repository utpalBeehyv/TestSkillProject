import { useEffect, useState } from 'react'

// No measured spec for the auto-advance timing (it is behavior, not a
// Figma value) — 4.5s gives each slide's caption time to be read without
// the panel feeling static.
const AUTO_ADVANCE_MS = 4500

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Drives the sign-in illustration panel's carousel: which slide is
 * active, whether it is auto-advancing, and the play/pause toggle. Pure
 * local UI state — no server data. Autoplay defaults off when the user
 * has requested reduced motion; the play control still lets them start
 * it explicitly.
 *
 * @param {number} slideCount
 */
export function useIllustrationCarousel(slideCount) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())

  useEffect(() => {
    if (!isPlaying || slideCount <= 1) return undefined

    const timer = setInterval(() => {
      setActiveIndex((index) => (index + 1) % slideCount)
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(timer)
  }, [isPlaying, slideCount])

  const togglePlay = () => setIsPlaying((playing) => !playing)

  return { activeIndex, isPlaying, togglePlay }
}
