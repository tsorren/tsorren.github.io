import { skillCategories } from '../../data/skills';
import Section from '../layout/Section';
import SectionTitle from '../ui/SectionTitle';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const categoryStyles = [
  'from-indigo-600/20 to-violet-600/10 border-indigo-500/30 hover:border-indigo-400/50 hover:shadow-indigo-500/10',
  'from-cyan-600/20 to-blue-600/10 border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-cyan-500/10',
  'from-emerald-600/20 to-teal-600/10 border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-emerald-500/10',
  'from-amber-600/20 to-orange-600/10 border-amber-500/30 hover:border-amber-400/50 hover:shadow-amber-500/10',
  'from-rose-600/20 to-pink-600/10 border-rose-500/30 hover:border-rose-400/50 hover:shadow-rose-500/10',
];

const badgeStyles = [
  'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'bg-rose-500/15 text-rose-300 border-rose-500/25',
];

function SkillGroup({ category, index }) {
  const [ref, isVisible] = useScrollReveal();
  const style = categoryStyles[index % categoryStyles.length];
  const badgeStyle = badgeStyles[index % badgeStyles.length];

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl bg-gradient-to-br border backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:shadow-lg ${style} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">{category.name}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full border transition-transform duration-200 hover:scale-105 ${badgeStyle}`}
          >
            {skill}
          </span>
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
