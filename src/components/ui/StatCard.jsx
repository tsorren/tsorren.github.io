import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function StatCard({ value, label }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-3xl md:text-4xl font-bold text-indigo-400 font-mono">{value}</div>
      <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}
