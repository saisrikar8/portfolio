import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let frame

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      document.documentElement.style.setProperty('--mouse-x', `${(mouseX / window.innerWidth) * 100}%`)
      document.documentElement.style.setProperty('--mouse-y', `${(mouseY / window.innerHeight) * 100}%`)
    }

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(render)
    }

    const onOver = (e) => {
      if (e.target.closest?.('a, button, .interactable')) cursor.classList.add('hovering')
    }
    const onOut = (e) => {
      if (e.target.closest?.('a, button, .interactable')) cursor.classList.remove('hovering')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    frame = requestAnimationFrame(render)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
}
