import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const units = ['jours', 'heures', 'minutes', 'secondes'] as const;

function useCountdown() {
  const targetDate = new Date(Date.UTC(2026, 8, 12, 16, 0, 0)).getTime();

  const calc = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
    return {
      jours: Math.floor(diff / 86_400_000),
      heures: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      secondes: Math.floor((diff % 60_000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ✅ FIX: height et width utilisent le même clamp que le font-size → plus de coupure
function Digit({ value }: { value: number }) {
  const str = String(value).padStart(2, '0');
  const fontSize = 'clamp(2.8rem, 7vw, 4.5rem)';
  return (
    <div
      style={{
        position: 'relative',
        // height doit contenir le texte → on force une valeur basée sur le font-size réel
        height: 'clamp(3.4rem, 8.5vw, 5.5rem)',
        width: 'clamp(3.5rem, 8vw, 5.5rem)',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={str}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-wedding-accent)',
            userSelect: 'none',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {str}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Countdown() {
  const time = useCountdown();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--color-wedding-bg)' }}>
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-wedding-illustration) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.3em] text-[10px] font-serif mb-3" style={{ color: 'var(--color-wedding-illustration)' }}>
            Compte à rebours
          </p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--color-wedding-accent)' }}>
            Le Jour J
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5 opacity-30">
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
            <span style={{ color: 'var(--color-wedding-gold)' }}>✦</span>
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          </div>
        </motion.div>

        {/* Digits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center"
          style={{ gap: '0 clamp(0.5rem, 2vw, 1.5rem)' }}
        >
          {units.map((unit, i) => (
            <React.Fragment key={unit}>
              {/* Digit card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                className="flex flex-col items-center"
                style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem) clamp(0.5rem, 2vw, 2rem)' }}
              >
                <Digit value={time[unit]} />
                <span
                  className="uppercase font-serif mt-3"
                  style={{
                    color: 'var(--color-wedding-illustration)',
                    letterSpacing: '0.25em',
                    fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)',
                  }}
                >
                  {unit}
                </span>
              </motion.div>

              {/* Colon separator — not after last */}
              {i < units.length - 1 && (
                <span
                  className="font-serif font-light opacity-30 self-center"
                  style={{
                    color: 'var(--color-wedding-illustration)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    // align with the digit center
                    marginBottom: '1.5rem',
                  }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
