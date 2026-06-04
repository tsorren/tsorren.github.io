import { profile } from '../../data/profile';
import Section from '../layout/Section';
import SectionTitle from '../ui/SectionTitle';
import StatCard from '../ui/StatCard';

export default function AboutSection() {
  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profile.stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </Section>
  );
}
