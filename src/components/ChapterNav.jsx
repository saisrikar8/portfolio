import { useEffect, useState } from 'react'

const CHAPTERS = [
  { id: 'about', numeral: 'I', label: 'About' },
  { id: 'research', numeral: 'II', label: 'Research' },
  { id: 'projects', numeral: 'III', label: 'Projects' },
  { id: 'connect', numeral: 'IV', label: 'Connect' },
]

/**
 * Bottom-fixed section index — a scrollspy nav, not decoration. Replaces
 * the small hover-dot markers with one clear, always-legible way to see
 * where you are and jump anywhere else.
 *
 * Driven directly by scroll position rather than IntersectionObserver: when
 * two sections both cross a thin observed band at once (tall sections,
 * fast scroll), the observer's entries array isn't guaranteed to arrive in
 * document order, so whichever entry happens to land last in that batch
 * would silently win — not necessarily the section actually in view. This
 * is the same failure class already fixed once this session for the
 * card-jump reveal; picking "the last section whose top has crossed a
 * reference line" directly has no such ambiguity.
 */
export default function ChapterNav() {
  const [active, setActive] = useState(CHAPTERS[0].id)

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean)
    if (sections.length === 0) return

    const update = () => {
      const referenceY = window.innerHeight * 0.4
      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= referenceY) {
          current = section.id
        }
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav className="chapter-nav hidden md:flex" aria-label="Section navigation">
      {CHAPTERS.map((chapter) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className={`chapter-nav-item interactable${active === chapter.id ? ' active' : ''}`}
        >
          <span className="chapter-nav-numeral">{chapter.numeral}</span>
          <span>{chapter.label}</span>
        </a>
      ))}
    </nav>
  )
}
