import { profile } from '../../data/profile';
import { experience } from '../../data/experience';
import Section from '../layout/Section';
import SectionTitle from '../ui/SectionTitle';
import StatCard from '../ui/StatCard';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ExperienceCard({ exp, index }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="h-full flex flex-col">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
          <span className="text-indigo-400 text-sm">@ {exp.company}</span>
        </div>
        <p className="text-xs text-gray-500 font-mono mb-3">{exp.dates}</p>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{exp.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {exp.skills.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function AboutExperienceSection() {
  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {profile.stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Experience */}
      <SectionTitle id="experience">Experience</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {experience.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </Section>
  );
}
