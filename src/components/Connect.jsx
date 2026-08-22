import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import { profile } from '../data/profile'
import { useCardReveal } from '../hooks/useReveal'

const cardStyle = {
  backdropFilter: 'blur(24px)',
  backgroundColor: 'rgba(255, 255, 255, 0.94)',
  borderColor: 'rgba(0, 50, 98, 0.2)',
  borderWidth: '1px',
}

const cardClass =
  'interactable group relative p-8 border border-outline-variant rounded-lg transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-white/5 hover:backdrop-blur-sm hover:border-berkeley-blue/30 flex flex-col items-center justify-center h-[200px]'

function ConnectCard({ href, label, Icon, name, delay }) {
  const ref = useCardReveal()

  return (
    <a
      ref={ref}
      className={`${cardClass} card-jump`}
      style={{ ...cardStyle, transitionDelay: `${delay}ms` }}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      aria-label={name}
    >
      <Icon className="w-12 h-12 mb-4 text-on-surface" />
      <span className="text-sm font-mono uppercase tracking-widest opacity-70">{label}</span>
    </a>
  )
}

export default function Connect() {
  const cards = [
    { href: profile.github, label: profile.githubHandle, Icon: GitHubIcon, name: 'GitHub' },
    { href: profile.linkedin, label: profile.linkedinHandle, Icon: LinkedInIcon, name: 'LinkedIn' },
    { href: `mailto:${profile.email}`, label: 'Get in touch', Icon: MailIcon, name: 'Email' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <ConnectCard key={card.name} {...card} delay={i * 90} />
      ))}
    </div>
  )
}
