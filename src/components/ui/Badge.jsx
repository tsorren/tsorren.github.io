export default function Badge({ children }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
      {children}
    </span>
  );
}
