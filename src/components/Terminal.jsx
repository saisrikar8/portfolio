import { useEffect, useRef, useState } from 'react'

const LINE = 'just another ML enthusiast following the stars'

const DEFAULT_WIDTH = 420
const DEFAULT_HEIGHT = 200
const MIN_WIDTH = 280
const MIN_HEIGHT = 150
const MAX_WIDTH = 720
const MAX_HEIGHT = 520
const GAP = 40

/**
 * A decorative terminal window that fills the whitespace beside the About
 * text — draggable by its titlebar, resizable from its corner handle.
 *
 * Position/size are absolute-positioned in px relative to the nearest
 * positioned ancestor (the About section), computed on mount by actually
 * measuring `anchorSelector`'s rendered box rather than guessing a
 * breakpoint — the previous fixed-width-inside-a-flex-row approach broke
 * (wrapped below instead of sitting beside the text, twice) because a
 * static width plus a variable-width paragraph don't reliably fit
 * together at every viewport size. Every drag/resize step is clamped
 * against the live viewport width so this can never push the page into
 * horizontal overflow, regardless of where the user drags it to.
 */
export default function Terminal({ anchorSelector }) {
  const [typed, setTyped] = useState('')
  const [pos, setPos] = useState(null)
  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  const rootRef = useRef(null)
  const userMovedRef = useRef(false)
  const posRef = useRef(pos)
  const sizeRef = useRef(size)

  posRef.current = pos
  sizeRef.current = size

  // Typing animation.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTyped(LINE)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(LINE.slice(0, i))
      if (i >= LINE.length) window.clearInterval(id)
    }, 45)
    return () => window.clearInterval(id)
  }, [])

  // Default placement: beside the anchor paragraph if there's room, else
  // directly below it. Recomputed on window resize until the user drags
  // or resizes the window themselves, at which point their choice sticks.
  useEffect(() => {
    const compute = () => {
      if (userMovedRef.current) return
      const anchor = document.querySelector(anchorSelector)
      const container = rootRef.current?.offsetParent
      if (!anchor || !container) return

      const anchorRect = anchor.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const availableRight = containerRect.right - anchorRect.right - GAP

      if (availableRight >= DEFAULT_WIDTH) {
        setPos({
          left: anchorRect.right - containerRect.left + GAP,
          top: anchorRect.top - containerRect.top,
        })
      } else {
        setPos({
          left: 0,
          top: anchorRect.bottom - containerRect.top + GAP,
        })
      }
    }

    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [anchorSelector])

  const startDrag = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startPos = posRef.current
    if (!startPos) return
    userMovedRef.current = true

    const onMove = (moveEvent) => {
      const container = rootRef.current?.offsetParent
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const width = sizeRef.current.width

      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      const minLeft = -containerRect.left
      const maxLeft = window.innerWidth - width - containerRect.left
      const left = Math.min(Math.max(startPos.left + dx, minLeft), Math.max(minLeft, maxLeft))
      const top = Math.max(startPos.top + dy, -containerRect.top)

      setPos({ left, top })
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const startResize = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startSize = sizeRef.current
    userMovedRef.current = true

    const onMove = (moveEvent) => {
      const container = rootRef.current?.offsetParent
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const left = posRef.current?.left ?? 0

      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      const maxWidthByViewport = window.innerWidth - containerRect.left - left - 8
      const width = Math.min(
        Math.max(startSize.width + dx, MIN_WIDTH),
        Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, maxWidthByViewport))
      )
      const height = Math.min(Math.max(startSize.height + dy, MIN_HEIGHT), MAX_HEIGHT)

      setSize({ width, height })
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div
      ref={rootRef}
      className="terminal-window hidden lg:flex flex-col"
      style={
        pos
          ? { left: pos.left, top: pos.top, width: size.width, height: size.height }
          : { visibility: 'hidden', width: size.width, height: size.height }
      }
    >
      <div className="terminal-titlebar interactable" onPointerDown={startDrag}>
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-titlebar-label">sai@berkeley:~</span>
      </div>
      <div className="terminal-body font-mono">
        <p>
          <span className="terminal-prompt">$</span> whoami
        </p>
        <p className="terminal-output">
          {typed}
          <span className="terminal-cursor" />
        </p>
      </div>
      <div
        className="terminal-resize-handle interactable"
        onPointerDown={startResize}
        aria-hidden="true"
      />
    </div>
  )
}
