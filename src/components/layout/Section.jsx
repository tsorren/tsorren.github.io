export default function Section({ children, id, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
