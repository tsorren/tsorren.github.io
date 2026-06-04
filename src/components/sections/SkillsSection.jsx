import { skillCategories } from '../../data/skills';
import Section from '../layout/Section';
import SectionTitle from '../ui/SectionTitle';
import Badge from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function SkillGroup({ category, index }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">{category.name}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <Section id="skills">
      <SectionTitle>Tech Stack</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, i) => (
          <SkillGroup key={cat.name} category={cat} index={i} />
        ))}
      </div>
    </Section>
  );
}
