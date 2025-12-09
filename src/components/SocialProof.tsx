'use client';
import Container from "./Container";

const SocialProof = () => (
  <section className="border-y border-zinc-100 bg-zinc-50/50 py-10 overflow-hidden">
    <Container className="text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-8">Integrated with the modern stack</p>
      {/* UPDATED RESPONSIVE LAYOUT:
        - flex-wrap: Allows items to break to a new line on small screens
        - gap-8: Smaller gap on mobile
        - md:gap-24: Larger gap on desktop
      */}
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-24 opacity-40 grayscale mix-blend-multiply">
        {['Next.js', 'Python', 'Rust', 'Docker', 'TypeScript'].map((tech) => (
          <span key={tech} className="font-semibold text-xl md:text-2xl select-none text-zinc-900">
            {tech}
          </span>
        ))}
      </div>
    </Container>
  </section>
);
export default SocialProof;