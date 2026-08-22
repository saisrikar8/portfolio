import { useReveal } from '../hooks/useReveal'

// Real, previously-verified numbers — same sourcing as the rest of the
// site (HERMES/SELENE/TERRA READMEs). Shown big and unhidden on purpose.
const STATS = [
  { value: '87.5%', label: 'HERMES detection accuracy', tag: 'IEEE · Jan 2026' },
  { value: '0.891', label: 'TERRA · ViT R² vs. physics baseline', tag: 'In Progress' },
  { value: '27,000+', label: 'hours of spacecraft telemetry behind SELENE', tag: 'Springer Nature · Jul 2026' },
]

/**
 * Full-bleed, dark, high-contrast break in the page — the site is
 * otherwise a single flat light surface throughout, which reads as overly
 * austere. This is one deliberate loud moment, not a new pattern repeated
 * everywhere.
 */
export default function StatBanner() {
  const ref = useReveal()

  return (
    // Cancels <main>'s own padding (pl-8 md:pl-24 pr-4 md:pr-12) so this
    // wrapper's box is exactly flush with <main>'s border edges — which
    // are centered via mx-auto regardless of viewport width. Only then is
    // "left-1/2 w-screen -translate-x-1/2" on the inner div mathematically
    // correct at every breakpoint (verified: resolves to 0 offset both
    // above and below the max-w-7xl cap).
    <div className="-ml-8 md:-ml-24 -mr-4 md:-mr-12 reveal-section" ref={ref}>
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="bg-berkeley-blue text-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-8 md:px-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-12">
              Selected Results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif font-light text-6xl md:text-7xl leading-none mb-4">
                    {stat.value}
                  </div>
                  <p className="text-white/70 leading-relaxed max-w-[30ch]">{stat.label}</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/40 mt-3">
                    {stat.tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
