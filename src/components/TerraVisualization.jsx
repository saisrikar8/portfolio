import { useEffect, useRef, useState } from 'react'

/** Inline, scroll-linked model comparison for TERRA. */
export default function TerraVisualization({ models }) {
  const chartRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [activeModel, setActiveModel] = useState(null)

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const update = () => {
      const { top } = chart.getBoundingClientRect()
      // Progress from first entering the viewport to its natural reading position.
      setProgress(Math.min(1, Math.max(0, (window.innerHeight - top) / (window.innerHeight * 0.55))))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      ref={chartRef}
      className="terra-chart"
      aria-label="TERRA model R squared comparison"
      style={{ '--chart-progress': progress }}
    >
      <div className="terra-plot" role="list" aria-label="R squared values from zero to one">
        <span className="terra-y-axis" aria-hidden="true" />
        <span className="terra-x-axis" aria-hidden="true" />
        <div className="terra-columns">
          {models?.map((model) => {
            return (
              <button
                key={model.name}
                type="button"
                role="listitem"
                className={`terra-bar w-full text-left ${activeModel === model ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveModel(model)}
                onMouseLeave={() => setActiveModel(null)}
                onFocus={() => setActiveModel(model)}
                onBlur={() => setActiveModel(null)}
                onClick={() => setActiveModel(activeModel === model ? null : model)}
                aria-label={`${model.name}: R squared ${model.r2.toFixed(3)}, mean absolute error ${model.mae.toExponential(2)}`}
              >
                <span className="terra-bar-track">
                  <span
                    className="terra-bar-fill"
                    style={{ height: `${model.r2 * progress * 100}%` }}
                  />
                </span>
                <span className="terra-bar-name font-mono text-[10px] text-on-surface">{model.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
