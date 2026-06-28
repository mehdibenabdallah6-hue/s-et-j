import React from 'react';
import { motion } from 'motion/react';

const events = [
  { time: '17H00', title: 'Accueil des invités', icon: '✦' },
  { time: '19H00', title: 'Accueil de la famille du marié', icon: '✦' },
  { time: '19H30', title: 'Entrée de la mariée', icon: '♡' },
  { time: '22H00', title: 'Doura', icon: '✦' },
  { time: '23H00', title: 'Dîner', icon: '✦' },
  { time: '00H30', title: 'Robe Blanche', icon: '♡' },
];

export default function Timeline() {
  return (
    <section id="programme" className="py-24 md:py-36 relative overflow-hidden">
      {/* Faint diagonal watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-wedding-illustration) 0, var(--color-wedding-illustration) 1px, transparent 0, transparent 50%)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.3em] text-[10px] font-serif mb-3" style={{ color: 'var(--color-wedding-illustration)' }}>
            Déroulement de la soirée
          </p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--color-wedding-accent)' }}>
            Le Programme
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5 opacity-30">
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
            <span style={{ color: 'var(--color-wedding-gold)' }}>✦</span>
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          </div>
        </motion.div>

        {/* Timeline items */}
        <div className="relative">
          {/* Vertical center line — desktop */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(154,142,120,0.25) 10%, rgba(154,142,120,0.25) 90%, transparent)' }}
          />

          {/* Vertical left line — mobile */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px md:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(154,142,120,0.25) 10%, rgba(154,142,120,0.25) 90%, transparent)' }}
          />

          <div className="space-y-0">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-center md:grid md:grid-cols-2 gap-0 mb-10 md:mb-0"
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-5 pl-12">
                    {/* Mobile dot */}
                    <div
                      className="absolute left-5 top-3 w-2 h-2 rounded-full -translate-x-1/2"
                      style={{ backgroundColor: 'var(--color-wedding-accent)', boxShadow: '0 0 0 4px rgba(243,237,226,1), 0 0 0 5px rgba(154,142,120,0.3)' }}
                    />
                    <div>
                      <p className="font-serif uppercase tracking-[0.2em] text-sm font-semibold mb-1" style={{ color: 'var(--color-wedding-accent)' }}>
                        {event.time}
                      </p>
                      <p className="font-serif text-lg italic" style={{ color: 'var(--color-wedding-illustration)' }}>
                        {event.title}
                      </p>
                    </div>
                  </div>

                  {/* Desktop left content */}
                  <div className={`hidden md:flex justify-end py-8 pr-12 ${!isLeft ? 'md:invisible' : ''}`}>
                    <div className="text-right">
                      <p className="font-serif uppercase tracking-[0.22em] text-sm font-semibold mb-2" style={{ color: 'var(--color-wedding-accent)' }}>
                        {event.time}
                      </p>
                      <p className="font-script text-2xl" style={{ color: 'var(--color-wedding-illustration)' }}>
                        {event.title}
                      </p>
                    </div>
                  </div>

                  {/* Desktop center dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px]"
                      style={{
                        backgroundColor: 'var(--color-wedding-bg)',
                        borderColor: 'rgba(154,142,120,0.4)',
                        color: 'var(--color-wedding-gold)',
                      }}
                    >
                      {event.icon}
                    </div>
                  </div>

                  {/* Desktop right content */}
                  <div className={`hidden md:flex justify-start py-8 pl-12 ${isLeft ? 'md:invisible' : ''}`}>
                    <div className="text-left">
                      <p className="font-serif uppercase tracking-[0.22em] text-sm font-semibold mb-2" style={{ color: 'var(--color-wedding-accent)' }}>
                        {event.time}
                      </p>
                      <p className="font-script text-2xl" style={{ color: 'var(--color-wedding-illustration)' }}>
                        {event.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6 opacity-30">
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
            <span style={{ color: 'var(--color-wedding-gold)' }}>♡</span>
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          </div>
          <p className="uppercase tracking-[0.25em] text-[10px] font-serif mb-3" style={{ color: 'var(--color-wedding-illustration)' }}>
            Jusqu'au bout de la nuit
          </p>
          <h3 className="font-script text-4xl" style={{ color: 'var(--color-wedding-accent)' }}>
            Danse & célébration
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
