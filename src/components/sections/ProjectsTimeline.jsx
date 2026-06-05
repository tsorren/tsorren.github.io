import { useState, useRef, useEffect } from 'react';
import { projects } from '../../data/projects';
import Section from '../layout/Section';
import SectionTitle from '../ui/SectionTitle';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ProjectDetail({ project, isOpen }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: isOpen ? `${height}px` : '0px', opacity: isOpen ? 1 : 0 }}
    >
      <div ref={contentRef} className="pt-8 pb-4">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white/5 backdrop-blur-md border border-indigo-500/30 p-6 md:p-8 shadow-lg shadow-indigo-500/5">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            {project.highlight && <span className="text-sm">🔥</span>}
            <span className="text-xs uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">
              {project.category}
            </span>
          </div>

          <p className="text-xs text-gray-500 font-mono mb-4">{project.startDate} — {project.endDate}</p>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">{project.description}</p>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Key Concepts</p>
            <div className="flex flex-wrap gap-2">
              {project.concepts.map((c) => (
                <span key={c} className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <Button href={project.repo} variant="primary">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View on GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsTimeline() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [sectionRef, isVisible] = useScrollReveal(0.1);
  const scrollContainerRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Gather unique years for grouping
  const years = [...new Set(projects.map((p) => p.year))];

  return (
    <Section id="projects">
      <SectionTitle>Project Timeline</SectionTitle>
      <p className="text-gray-400 mb-10 max-w-2xl">
        Click on any milestone to explore the project details.
      </p>

      <div
        ref={sectionRef}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Horizontal scrollable timeline */}
        <div ref={scrollContainerRef} className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <div className="relative min-w-[700px]">
            {/* The line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            {/* Dots */}
            <div className="flex justify-between items-start relative">
              {projects.map((project, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={project.name}
                    onClick={() => handleClick(i)}
                    className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    aria-expanded={isActive}
                    aria-label={`${project.name} (${project.year})`}
                  >
                    {/* Year label */}
                    <span className={`text-[10px] font-mono mb-2 transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                      {project.year}
                    </span>

                    {/* Dot */}
                    <div className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-500 border-indigo-400 scale-125 shadow-lg shadow-indigo-500/60'
                        : project.highlight
                          ? 'bg-indigo-500/60 border-indigo-400/60 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-indigo-500/30'
                          : 'bg-gray-700 border-gray-500 group-hover:bg-gray-600 group-hover:scale-110'
                    }`}>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-indigo-400/40 animate-ping" />
                      )}
                    </div>

                    {/* Project name */}
                    <span className={`mt-2 text-[11px] max-w-[80px] text-center leading-tight transition-colors duration-300 ${
                      isActive ? 'text-white font-semibold' : 'text-gray-500 group-hover:text-gray-300'
                    }`}>
                      {project.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expandable detail panel */}
        {projects.map((project, i) => (
          <ProjectDetail key={project.name} project={project} isOpen={activeIndex === i} />
        ))}
      </div>
    </Section>
  );
}
