import { useMagnetic } from '../hooks/useMagnetic'

export default function MagneticLink({ href, children, className = '' }) {
  const { wrapRef, elemRef } = useMagnetic()

  return (
    <div className="magnetic-wrap" ref={wrapRef}>
      <a
        ref={elemRef}
        className={`link-hover interactable magnetic-elem ${className}`}
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    </div>
  )
}
