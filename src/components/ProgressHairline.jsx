import { useEffect, useRef } from 'react'

/** Vertical hairline down the left gutter, filled by scroll progress. */
export default function ProgressHairline() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      bar.style.height = `${percent}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="progress-hairline" ref={barRef} aria-hidden="true" />
}
