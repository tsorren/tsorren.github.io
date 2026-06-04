import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function SectionTitle({ children, id }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div ref={ref} id={id} className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {children}
      </h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400" />
    </div>
  );
}
