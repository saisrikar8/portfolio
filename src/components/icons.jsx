import { MagnifyingGlass, Cube, User, GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react'

/** Small glyphs that sit before each section number. */
export function ResearchIcon(props) {
  return <MagnifyingGlass weight="light" aria-hidden="true" {...props} />
}

export function ProjectsIcon(props) {
  return <Cube weight="light" aria-hidden="true" {...props} />
}

export function AboutIcon(props) {
  return <User weight="light" aria-hidden="true" {...props} />
}

export function GitHubIcon(props) {
  return <GithubLogo weight="fill" aria-hidden="true" {...props} />
}

export function LinkedInIcon(props) {
  return <LinkedinLogo weight="fill" aria-hidden="true" {...props} />
}

export function MailIcon(props) {
  return <EnvelopeSimple weight="light" aria-hidden="true" {...props} />
}
