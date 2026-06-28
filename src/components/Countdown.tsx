import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    jours: 0,
    heures: 0,
    minutes: 0,
    secondes: 0
  });

  useEffect(() => {
    // 12 September 2026, 17:00 Casablanca time (GMT+1)
    // Date.UTC(year, monthIndex, day, hours, minutes, seconds)
    // Month is 0-indexed, so September is 8
    // 17:00 GMT+1 is 16:00 UTC
    const targetDate = new Date(Date.UTC(2026, 8, 12, 16, 0, 0)).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
          heures: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secondes: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-wedding-bg relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-serif font-light text-5xl md:text-6xl text-wedding-accent mb-2 w-20 text-center">
                {String(value).padStart(2, '0')}
              </span>
              <span className="font-serif uppercase tracking-[0.2em] text-[10px] md:text-xs text-wedding-illustration opacity-70">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
