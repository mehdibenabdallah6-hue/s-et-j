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
  const fontSize = 'clamp(1.4rem, 4.5vw, 2rem)';
  return (
    <div
      style={{
        position: 'relative',
        // height doit contenir le texte → on force une valeur basée sur le font-size réel
        height: 'clamp(2rem, 6vw, 3rem)',
        width: 'clamp(2.5rem, 7vw, 3.5rem)',
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
            fontWeight: 800,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="flex flex-wrap justify-center items-center mt-6 gap-2 md:gap-6"
    >
      {units.map((unit, i) => (
        <React.Fragment key={unit}>
          {/* Digit block */}
          <div className="flex flex-col items-center">
            <div 
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full mb-2"
              style={{
                backgroundColor: 'rgba(255,255,255,0.4)',
                border: '1.5px solid rgba(154,142,120,0.3)',
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)'
              }}
            >
              <Digit value={time[unit]} />
            </div>
            <span
              className="uppercase font-serif font-bold"
              style={{
                color: 'var(--color-wedding-accent)',
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
              }}
            >
              {unit}
            </span>
          </div>

          {/* Separator */}
          {i < units.length - 1 && (
            <span
              className="font-serif font-light opacity-40 self-start mt-2 md:mt-3"
              style={{
                color: 'var(--color-wedding-accent)',
                fontSize: '1.2rem',
              }}
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
