import { Fragment } from 'react'
import CustomCursor from './components/CustomCursor'
import ProgressHairline from './components/ProgressHairline'
import EdgeMasks from './components/EdgeMasks'
import ChapterNav from './components/ChapterNav'
import Terminal from './components/Terminal'
import WordReveal from './components/WordReveal'
import SectionLabel from './components/SectionLabel'
import Divider from './components/Divider'
import ResearchArticle from './components/ResearchArticle'
import ProjectArticle from './components/ProjectArticle'
import Connect from './components/Connect'
import RightRail from './components/RightRail'
import Footer from './components/Footer'
import { ResearchIcon, ProjectsIcon, AboutIcon } from './components/icons'
import { useReveal } from './hooks/useReveal'
import { profile, about, research, projects } from './data/profile'

export default function App() {
  const headerRef = useReveal()
  const aboutRef = useReveal()
  const researchRef = useReveal()
  const projectsRef = useReveal()
  const connectRef = useReveal()

  return (
    <>
      <div className="mesh-background" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <ProgressHairline />
      <EdgeMasks />
      <ChapterNav />

      <main className="w-full pl-8 md:pl-24 pr-4 md:pr-12 py-16 md:py-32 max-w-7xl mx-auto">
        <header className="mb-32 reveal-section" ref={headerRef}>
          <WordReveal text={profile.name} className="hero-title mb-8 font-serif" id="heroTitle" />
          <p className="text-xl md:text-2xl font-light text-on-surface max-w-2xl leading-relaxed">
            {profile.tagline}
          </p>
        </header>

        <section className="reveal-section relative mb-32" id="about" ref={aboutRef}>
          <SectionLabel icon={AboutIcon}>01 / About</SectionLabel>
          <p className="text-lg leading-relaxed text-on-surface-variant max-w-[65ch]">{about}</p>
          <Terminal anchorSelector="#about p" />
        </section>

        <div className="md:grid md:grid-cols-[2fr_1fr] md:gap-12 lg:gap-24 mt-32">
          <div className="flex flex-col gap-32">
            <section
              className="reveal-section flex flex-col gap-16 relative"
              id="research"
              ref={researchRef}
            >
              <SectionLabel icon={ResearchIcon}>02 / Research</SectionLabel>
              {research.map((item, i) => (
                <Fragment key={item.id}>
                  {i > 0 && <Divider />}
                  <ResearchArticle item={item} />
                </Fragment>
              ))}
            </section>

            <section
              className="reveal-section flex flex-col gap-16 relative pt-16"
              id="projects"
              ref={projectsRef}
            >
              <SectionLabel icon={ProjectsIcon}>03 / Applied Projects</SectionLabel>
              {projects.map((item, i) => (
                <Fragment key={item.id}>
                  {i > 0 && <Divider />}
                  <ProjectArticle item={item} />
                </Fragment>
              ))}
            </section>

            <section className="reveal-section pt-32 relative" id="connect" ref={connectRef}>
              <Divider className="mb-16" />
              <h2 className="hero-title mb-16 font-serif">
                <span className="word-mask mr-4 inline-block">
                  <span className="inline-block" style={{ animationDelay: '0.1s' }}>
                    Let's
                  </span>
                </span>
                <span className="word-mask inline-block">
                  <span className="inline-block" style={{ animationDelay: '0.2s' }}>
                    connect.
                  </span>
                </span>
              </h2>
              <Connect />
            </section>

            <Footer />
          </div>

          <RightRail />
        </div>
      </main>
    </>
  )
}
