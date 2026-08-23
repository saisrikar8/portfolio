import { useEffect, useState } from 'react'

const CHAPTERS = [
  { id: 'about', numeral: 'I', label: 'About' },
  { id: 'research', numeral: 'II', label: 'Research' },
  { id: 'projects', numeral: 'III', label: 'Projects' },
  { id: 'connect', numeral: 'IV', label: 'Connect' },
]

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
