/** The "01 / Research" hairline label pinned above each section on desktop. */
export default function SectionLabel({ icon: Icon, children }) {
  return (
    <h2 className="text-sm font-mono uppercase tracking-widest text-on-surface-variant mb-4 hidden md:block absolute -top-12 left-0">
      <Icon className="inline-block w-4 h-4 mr-2 mb-0.5 opacity-70" />
      {children}
    </h2>
  )
}
