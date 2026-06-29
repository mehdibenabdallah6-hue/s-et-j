import React from 'react';
import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Invitation() {
  return (
    <section
      id="invitation"
      className="py-24 md:py-44 relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage: "url('/bg-invitation.png')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
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
          className="text-2xl md:text-4xl mb-6 md:mb-10 leading-relaxed"
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
          className="flex items-center justify-center gap-4 mb-6 md:mb-10 opacity-40"
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
            className="font-serif text-sm md:text-base font-medium mb-2 md:mb-3"
            style={{ color: 'var(--color-wedding-accent)' }}
          >
            Leila & Karim Benabdallah
          </p>
          <p
            className="font-serif text-sm md:text-base italic"
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
          className="font-script mt-8 md:mt-12 mb-1 md:mb-2 leading-none"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: 'var(--color-wedding-accent)' }}
        >
          Selma
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.25}
          className="font-serif text-lg md:text-xl italic my-2 md:my-4"
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
          className="font-script leading-none mb-8 md:mb-12"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: 'var(--color-wedding-accent)' }}
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
          className="flex items-center justify-center gap-4 mb-6 md:mb-10 opacity-40"
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
          className="font-serif text-sm md:text-base leading-relaxed md:leading-loose"
          style={{ color: 'var(--color-wedding-illustration)' }}
        >
          et seraient ravis de célébrer avec vous<br />
          cette heureuse union.
        </motion.p>
      </div>
    </section>
  );
}
