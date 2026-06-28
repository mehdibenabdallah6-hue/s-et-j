import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Invitation() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return (
    <section
      id="invitation"
      className="py-32 md:py-44 relative overflow-hidden"
    >
      {/* Background image container with aspect-ratio and edge blending */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/bg-invitation.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...(isMobile 
            ? { left: 0, right: 0, transform: 'none', width: '100%' } 
            : { 
                height: '100%', 
                aspectRatio: '1055/1491',
              }
          )
        }}
      >
        {/* Horizontal edge blending overlays for desktop */}
        {!isMobile && (
          <>
            <div 
              className="absolute left-0 top-0 bottom-0 pointer-events-none"
              style={{ width: '8%', background: 'linear-gradient(to right, #F3EDE2, rgba(243,237,226,0))' }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 pointer-events-none"
              style={{ width: '8%', background: 'linear-gradient(to left, #F3EDE2, rgba(243,237,226,0))' }}
            />
          </>
        )}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(243,237,226,0.45), rgba(243,237,226,0.55))' }}
      />

      {/* Decorative corner ornaments */}
      {[
        'top-8 left-8',
        'top-8 right-8',
        'bottom-8 left-8',
        'bottom-8 right-8',
      ].map((pos, i) => (
        <svg
          key={i}
          className={`absolute ${pos} w-10 h-10 opacity-20`}
          viewBox="0 0 40 40"
          fill="none"
          stroke="var(--color-wedding-illustration)"
          strokeWidth="1"
        >
          {i === 0 && <><path d="M2 2 L2 14 M2 2 L14 2" /><circle cx="2" cy="2" r="1.5" fill="var(--color-wedding-illustration)" /></>}
          {i === 1 && <><path d="M38 2 L38 14 M38 2 L26 2" /><circle cx="38" cy="2" r="1.5" fill="var(--color-wedding-illustration)" /></>}
          {i === 2 && <><path d="M2 38 L2 26 M2 38 L14 38" /><circle cx="2" cy="38" r="1.5" fill="var(--color-wedding-illustration)" /></>}
          {i === 3 && <><path d="M38 38 L38 26 M38 38 L26 38" /><circle cx="38" cy="38" r="1.5" fill="var(--color-wedding-illustration)" /></>}
        </svg>
      ))}

      <div className="container mx-auto px-6 text-center max-w-2xl relative">
        {/* Bismillah */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-4xl mb-10 leading-relaxed"
          style={{ fontFamily: "'Amiri', serif", direction: 'rtl', color: 'var(--color-wedding-accent)' }}
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </motion.div>

        {/* Ornament */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
          className="flex items-center justify-center gap-4 mb-10 opacity-40"
        >
          <span className="block h-px w-16" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          <span style={{ color: 'var(--color-wedding-gold)', fontSize: '1.1rem' }}>✦</span>
          <span className="block h-px w-16" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
        </motion.div>

        {/* Parents */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.15}
        >
          <p
            className="font-serif uppercase tracking-[0.25em] text-sm mb-3"
            style={{ color: 'var(--color-wedding-accent)' }}
          >
            Leila & Karim Benabdallah
          </p>
          <p
            className="font-serif text-base italic"
            style={{ color: 'var(--color-wedding-illustration)' }}
          >
            ont la joie de vous convier au mariage de leur fille
          </p>
        </motion.div>

        {/* Names */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
          className="font-script mt-12 mb-2 leading-none"
          style={{ fontSize: 'clamp(4.5rem, 12vw, 7rem)', color: 'var(--color-wedding-accent)' }}
        >
          Selma
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.25}
          className="font-serif text-xl italic my-4"
          style={{ color: 'var(--color-wedding-illustration)' }}
        >
          avec
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
          className="font-script leading-none mb-12"
          style={{ fontSize: 'clamp(4.5rem, 12vw, 7rem)', color: 'var(--color-wedding-accent)' }}
        >
          Jamil Joundy
        </motion.h2>

        {/* Ornament bottom */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.35}
          className="flex items-center justify-center gap-4 mb-10 opacity-40"
        >
          <span className="block h-px w-16" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          <span style={{ color: 'var(--color-wedding-gold)', fontSize: '1.1rem' }}>✦</span>
          <span className="block h-px w-16" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.4}
          className="font-serif text-base leading-loose"
          style={{ color: 'var(--color-wedding-illustration)' }}
        >
          et seraient ravis de célébrer avec vous<br />
          cette heureuse union.
        </motion.p>
      </div>
    </section>
  );
}
