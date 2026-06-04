export default function Button({ children, href, variant = 'primary', onClick }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30',
  };

  const classes = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
