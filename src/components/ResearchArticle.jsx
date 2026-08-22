import InlineStats from './InlineStats'
import { useCardReveal } from '../hooks/useReveal'

export default function ResearchArticle({ item }) {
  const ref = useCardReveal()

  return (
    <article className="relative interactable card-jump" ref={ref}>
      <div className="md:hidden mb-2 font-mono text-sm text-on-surface-variant">
        {item.date} / {item.venue}
      </div>
      <h3 className="publication-title font-light mb-4">
        <a href={item.href} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      </h3>
      <p className="text-lg leading-relaxed text-on-surface-variant max-w-[65ch]">
        {item.description}
      </p>
      <InlineStats stats={item.stats} chart={item.chart} />
    </article>
  )
}
