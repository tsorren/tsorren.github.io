import { useScrollReveal } from '../../hooks/useScrollReveal';
import Badge from './Badge';
import Card from './Card';

export default function TimelineNode({ project, index }) {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${Math.min(index * 100, 500)}ms` }}
    >
      {/* Timeline dot */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 ${project.highlight ? 'bg-indigo-500 border-indigo-400 shadow-lg shadow-indigo-500/50' : 'bg-gray-700 border-gray-500'}`} />
      </div>

      {/* Content */}
      <Card highlight={project.highlight} className="flex-1 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{project.year}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{project.category}</span>
          {project.highlight && <span className="text-xs">🔥</span>}
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-lg font-bold text-white hover:text-indigo-400 transition-colors"
        >
          {project.name}
          <svg className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
