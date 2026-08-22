/**
 * Real metrics shown directly under each publication — not hidden behind
 * a hover state. Hiding the actual substance of the work behind an
 * interaction is exactly the kind of over-precious minimalism to avoid.
 */
export default function InlineStats({ stats, chart }) {
  const max = Math.max(...chart, 0.0001)

  return (
    <div className="inline-stats">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="inline-stat-value">{stat.value}</div>
          <div className="inline-stat-label">{stat.label}</div>
        </div>
      ))}
      <div className="stat-chart" aria-hidden="true">
        {chart.map((value, i) => (
          <div
            className="stat-chart-bar"
            key={i}
            style={{
              height: `${Math.max(12, (value / max) * 100)}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
