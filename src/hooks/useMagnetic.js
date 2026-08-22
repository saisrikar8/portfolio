import { useEffect, useRef } from 'react'

/**
 * Magnetic link: the element chases the pointer at 30% of its offset from the
 * wrapper's centre, then eases back on leave.
 */
export function useMagnetic() {
  const wrapRef = useRef(null)
  const elemRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const elem = elemRef.current
    if (!wrap || !elem) return

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      elem.style.transition = 'transform 0.1s ease-out'
    }

    const onLeave = () => {
      elem.style.transform = 'translate(0px, 0px)'
      elem.style.transition = 'transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return { wrapRef, elemRef }
}
