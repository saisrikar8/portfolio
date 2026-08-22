import MagneticLink from './MagneticLink'
import TerraVisualization from './TerraVisualization'
import { useCardReveal } from '../hooks/useReveal'

export default function ProjectArticle({ item }) {
  const ref = useCardReveal()

  return (
    <article className="relative interactable card-jump" ref={ref}>
      <div className="md:hidden mb-2 font-mono text-sm text-on-surface-variant">{item.status}</div>
      <h3 className="publication-title font-light mb-4">
        <a href={item.href} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      </h3>
      {item.hasVisual ? (
        <div className="flow-root">
          <TerraVisualization models={item.models} />
          <p className="text-lg leading-relaxed text-on-surface-variant lg:max-w-[36rem]">
            {item.description}
          </p>
        </div>
      ) : (
        <p className={`text-lg leading-relaxed text-on-surface-variant max-w-[65ch] ${item.link ? 'mb-4' : ''}`}>
          {item.description}
        </p>
      )}

      {item.hasVisual && item.demo && (
        <div className="mt-4 clear-both">
          <MagneticLink href={item.demo.href} className="font-mono text-sm">
            {item.demo.label}
          </MagneticLink>
        </div>
      )}

      {item.link && (
        <MagneticLink href={item.link.href} className="font-mono text-sm">
          {item.link.label}
        </MagneticLink>
      )}
    </article>
  )
}
