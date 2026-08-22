import { useEffect, useRef, useState } from 'react'
import { research, projects } from '../data/profile'

/**
 * Measures each article's actual rendered top (relative to this rail) and
 * positions its marker there directly, rather than guessing a fixed gap.
 * A static gap (the previous approach) drifts out of sync the moment a
 * card's description gets longer or shorter — which is exactly what
 * happened: the SELENE/Springer Nature marker was landing next to HERMES
 * because the two publications' text blocks aren't the same height.
 */
function useArticleTops(sectionId, wrapperRef, itemCount) {
  const [tops, setTops] = useState([])

  useEffect(() => {
    const section = document.getElementById(sectionId)
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    const measure = () => {
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY
      const items = [...section.querySelectorAll(':scope > article')]
      setTops(items.map((el) => el.getBoundingClientRect().top + window.scrollY - wrapperTop))
    }

    measure()
    document.fonts?.ready?.then(measure)

    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
    // itemCount forces a re-measure when the underlying data array's length
    // changes (e.g. a project being added or removed).
  }, [sectionId, wrapperRef, itemCount])

  return tops
}

export default function RightRail() {
  const wrapperRef = useRef(null)
  const researchTops = useArticleTops('research', wrapperRef, research.length)
  const projectTops = useArticleTops('projects', wrapperRef, projects.length)

  return (
    <div className="hidden md:block relative" ref={wrapperRef}>
      {research.map((item, i) => (
        <div
          key={item.id}
          className="absolute right-0 text-right font-mono text-sm text-on-surface-variant"
          style={{ top: researchTops[i] ?? 0 }}
        >
          <span className="block text-on-surface font-serif italic text-base">{item.venue}</span>
          <span>{item.date}</span>
        </div>
      ))}

      {projects.map((item, i) => (
        <div
          key={item.id}
          className="absolute right-0 text-right font-mono text-sm text-on-surface-variant"
          style={{ top: projectTops[i] ?? 0 }}
        >
          <span className="block text-on-surface font-serif italic text-base">{item.status}</span>
        </div>
      ))}
    </div>
  )
}
