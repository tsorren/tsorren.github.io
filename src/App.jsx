import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsTimeline from './components/sections/ProjectsTimeline'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactFooter from './components/sections/ContactFooter'
import SectionDivider from './components/ui/SectionDivider'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsTimeline />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
      </main>
      <ContactFooter />
    </>
  )
}
