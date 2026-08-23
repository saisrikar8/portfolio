import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '87.5%', label: 'HERMES detection accuracy', tag: 'IEEE · Jan 2026' },
  { value: '0.891', label: 'TERRA · ViT R² vs. physics baseline', tag: 'In Progress' },
  { value: '27,000+', label: 'hours of spacecraft telemetry behind SELENE', tag: 'Springer Nature · Jul 2026' },
]

export default function StatBanner() {
  const ref = useReveal()

  return (
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
