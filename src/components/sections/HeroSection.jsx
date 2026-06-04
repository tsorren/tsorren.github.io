import { profile } from '../../data/profile';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-indigo-400 font-light mb-8">
          {profile.tagline}
        </p>
        <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
          {profile.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="#projects">View Projects</Button>
          <Button href={profile.linkedin} variant="secondary">LinkedIn</Button>
          {profile.SHOW_CV_BUTTON && (
            <Button href={profile.cvUrl} variant="secondary">Download CV</Button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
