import Divider from './Divider'
import MagneticLink from './MagneticLink'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/profile'

export default function Footer() {
  const ref = useReveal()

  return (
    <footer className="pt-16 pb-8 md:pb-24 mt-16 reveal-section" ref={ref}>
      <Divider className="mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-sm text-on-surface-variant">
        <span>© {profile.year} {profile.name}</span>
        <div className="flex gap-6">
          <MagneticLink href={profile.github}>GitHub</MagneticLink>
          <MagneticLink href={profile.linkedin}>LinkedIn</MagneticLink>
          <MagneticLink href={`mailto:${profile.email}`}>Email</MagneticLink>
        </div>
      </div>
    </footer>
  )
}
