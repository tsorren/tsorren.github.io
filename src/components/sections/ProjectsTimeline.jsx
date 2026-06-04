import { projects } from '../../data/projects';
import Section from '../layout/Section';
import SectionTitle from '../ui/SectionTitle';
import TimelineNode from '../ui/TimelineNode';

export default function ProjectsTimeline() {
  return (
    <Section id="projects">
      <SectionTitle>Project Timeline</SectionTitle>
      <p className="text-gray-400 mb-12 max-w-2xl">
        A chronological journey from memory-level systems to cloud-native microservices.
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-gray-700/50 to-transparent" />

        {projects.map((project, i) => (
          <TimelineNode key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
