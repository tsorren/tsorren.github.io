export default function SectionDivider() {
  return (
    <div className="flex justify-center py-6">
      <svg
        className="w-6 h-6 text-gray-600 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
}
