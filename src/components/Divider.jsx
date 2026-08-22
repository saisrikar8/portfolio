import { useDivider } from '../hooks/useReveal'

export default function Divider({ className = '' }) {
  const ref = useDivider()
  return <div ref={ref} className={`hairline-divider ${className}`} data-divider="" />
}
