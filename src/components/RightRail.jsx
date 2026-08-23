import { useEffect, useRef, useState } from 'react'
import { research, projects } from '../data/profile'

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
