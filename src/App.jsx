import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutExperienceSection from './components/sections/AboutExperienceSection'
import ProjectsTimeline from './components/sections/ProjectsTimeline'
import SkillsSection from './components/sections/SkillsSection'
import ContactFooter from './components/sections/ContactFooter'
import SectionDivider from './components/ui/SectionDivider'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* Pantalla 1: Hero */}
        <HeroSection />

        {/* Pantalla 2: About + Experience */}
        <AboutExperienceSection />
        <SectionDivider />

        {/* Pantalla 3: Projects Timeline */}
        <ProjectsTimeline />
        <SectionDivider />

        {/* Pantalla 4: Tech Stack + Contact */}
        <SkillsSection />
      </main>
      <ContactFooter />
    </>
  )
}
