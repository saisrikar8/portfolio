import { useEffect, useRef } from 'react'

/**
 * Adds `visible` to a `.reveal-section` once it scrolls into view, with the
 * same staggered delay the original design used.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), index * 60)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Per-card "jump" reveal, carousel-style: each element pops up from below
 * with a slight scale/rotate overshoot as it enters, then fades and drifts
 * upward once scrolled past. Reversing scroll direction reverses the same
 * CSS transition — there's no separate "scroll up" animation, just the
 * class toggling back based on current position.
 *
 * Driven directly by scroll/resize (not IntersectionObserver, not a
 * requestAnimationFrame throttle): an instant/fast scroll (anchor jump,
 * keyboard End, a hard trackpad flick) can move an element from below the
 * viewport to above it without the browser ever sampling an intersecting
 * frame, so an observer's callback would never fire and the card would get
 * stuck. An rAF-gated throttle has the same failure mode if the scheduled
 * frame never runs (e.g. a backgrounded tab) — the gate stays stuck closed
 * and every later update is dropped. Recomputing straight from the rect on
 * every event has neither gap, and for a handful of elements it's cheap
 * enough that throttling isn't buying anything.
 */
export function useCardReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()

      if (rect.bottom <= 0) {
        // Scrolled past above the viewport — exit upward like a carousel.
        el.classList.remove('visible')
        el.classList.add('exited')
      } else if (rect.top <= window.innerHeight - 80) {
        el.classList.add('visible')
        el.classList.remove('exited')
      } else {
        // Not reached yet — reset to the initial below-viewport state.
        el.classList.remove('visible', 'exited')
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return ref
}

/** Draws a hairline divider from 0% to 100% width when it enters the viewport. */
export function useDivider() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('drawn')
            obs.unobserve(entry.target)
          }
        })
      },
      // Zero-area target (the divider starts at width: 0), so the ratio never
      // reaches 1 — intersect on any overlap instead.
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
