import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIllustrationCarousel } from '../useIllustrationCarousel'

describe('useIllustrationCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('starts with activeIndex 0 and isPlaying true by default', () => {
    const { result } = renderHook(() => useIllustrationCarousel(3))

    expect(result.current.activeIndex).toBe(0)
    expect(result.current.isPlaying).toBe(true)
  })

  it('auto-advances the slide every 4.5 seconds when playing', () => {
    const { result } = renderHook(() => useIllustrationCarousel(3))

    expect(result.current.activeIndex).toBe(0)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(1)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(2)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(0)
  })

  it('does not auto-advance when isPlaying is false', () => {
    const { result } = renderHook(() => useIllustrationCarousel(3))

    act(() => {
      result.current.togglePlay()
    })

    expect(result.current.isPlaying).toBe(false)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(0)
  })

  it('togglePlay pauses and resumes auto-advance', () => {
    const { result } = renderHook(() => useIllustrationCarousel(3))

    expect(result.current.isPlaying).toBe(true)

    act(() => {
      result.current.togglePlay()
    })

    expect(result.current.isPlaying).toBe(false)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(0)

    act(() => {
      result.current.togglePlay()
    })

    expect(result.current.isPlaying).toBe(true)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(1)
  })

  it('does not auto-advance when slideCount is 1', () => {
    const { result } = renderHook(() => useIllustrationCarousel(1))

    expect(result.current.isPlaying).toBe(true)

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(result.current.activeIndex).toBe(0)
  })

  it('startswith isPlaying false when prefers-reduced-motion is set', () => {
    const matchMediaMock = vi.fn()
    matchMediaMock.mockReturnValue({ matches: true })
    window.matchMedia = matchMediaMock

    const { result } = renderHook(() => useIllustrationCarousel(3))

    expect(result.current.isPlaying).toBe(false)
  })
})
