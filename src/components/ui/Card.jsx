export default function Card({ children, className = '', highlight = false }) {
  return (
    <div
      className={`rounded-2xl bg-white/5 backdrop-blur-md border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/10 ${
        highlight ? 'border-indigo-500/40 hover:border-indigo-400/60' : 'border-white/10 hover:border-white/20'
      } ${className}`}
    >
      {children}
    </div>
  );
}
