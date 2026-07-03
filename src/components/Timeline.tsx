import React from 'react';
import { motion } from 'motion/react';

const events = [
  { 
    time: '17H00', 
    title: 'Accueil des invités', 
    image: '/accueil invitees.png',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <g transform="rotate(12 50 50)">
          <path d="M36,32 L48,32 L45,55 C45,58 39,58 39,55 Z" />
          <line x1="42" y1="57" x2="42" y2="73" />
          <line x1="36" y1="73" x2="48" y2="73" />
        </g>
        <g transform="rotate(-12 50 50)">
          <path d="M64,32 L52,32 L55,55 C55,58 61,58 61,55 Z" />
          <line x1="58" y1="57" x2="58" y2="73" />
          <line x1="52" y1="73" x2="64" y2="73" />
        </g>
        <circle cx="50" cy="36" r="1.5" fill="currentColor" />
        <circle cx="46" cy="29" r="1" fill="currentColor" />
        <circle cx="54" cy="29" r="1" fill="currentColor" />
      </svg>
    )
  },
  { 
    time: '19H00', 
    title: 'Accueil de la famille du marié', 
    image: '/le marie.png',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M35,63 C30,48 35,38 50,38 C65,38 70,48 65,63 C60,70 40,70 35,63 Z" />
        <path d="M35,53 C22,48 20,38 18,34 C18,34 22,44 32,46" />
        <path d="M64,46 C78,46 78,63 64,66" />
        <path d="M42,38 C42,32 58,32 58,38 Z" />
        <circle cx="50" cy="30" r="2" fill="currentColor" />
        <path d="M40,67 C45,69 55,69 60,67" />
      </svg>
    )
  },
  { 
    time: '19H30', 
    title: 'Entrée de la mariée', 
    image: '/la mariee.png',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15,75 C30,85 70,85 85,75" />
        <path d="M15,75 L25,48 L38,62 L50,34 L62,62 L75,48 L85,75" />
        <circle cx="50" cy="30" r="2.5" fill="currentColor" />
        <circle cx="25" cy="44" r="2" fill="currentColor" />
        <circle cx="75" cy="44" r="2" fill="currentColor" />
        <circle cx="38" cy="58" r="1.5" fill="currentColor" />
        <circle cx="62" cy="58" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  { 
    time: '22H00', 
    title: 'Doura', 
    image: '/doura.png',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="68" x2="88" y2="68" />
        <rect x="25" y="44" width="50" height="24" rx="2" />
        <path d="M25,44 C25,24 75,24 75,44" />
        <circle cx="50" cy="20" r="2" fill="currentColor" />
        <path d="M35,44 L35,68" />
        <path d="M65,44 L65,68" />
      </svg>
    )
  },
  { 
    time: '23H00', 
    title: 'Dîner', 
    image: '/dinner 2.png',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15,72 C15,77 85,77 85,72 Z" />
        <path d="M20,70 L47,38 C47,36 53,36 53,38 L80,70 Z" />
        <rect x="46" y="30" width="8" height="8" rx="2" />
        <path d="M42,20 C42,15 45,15 45,10" />
        <path d="M50,22 C50,17 53,17 53,12" />
      </svg>
    )
  },
  { 
    time: '00H30', 
    title: 'Robe Blanche', 
    image: '/robe blanche.png',
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M45,28 C45,23 55,23 55,28 L50,30 Z" />
        <line x1="35" y1="34" x2="65" y2="34" />
        <path d="M45,34 L43,48 L25,82 C24,85 76,85 75,82 L57,48 L55,34 Z" />
        <line x1="43" y1="50" x2="57" y2="50" />
      </svg>
    )
  },
];

export default function Timeline() {
  return (
    <section id="programme" className="py-24 md:py-44 relative overflow-hidden">
      {/* Soft gradient transition from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, var(--color-wedding-bg), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, var(--color-wedding-bg), transparent)' }}
      />

      {/* Ornamental top divider */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 opacity-30">
        <span className="block h-px w-16 md:w-24" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
        <span style={{ color: 'var(--color-wedding-gold)', fontSize: '0.7rem' }}>✦</span>
        <span className="block h-px w-16 md:w-24" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage: 'url(/bg-programme.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-bold font-serif mb-3" style={{ color: 'var(--color-wedding-accent)' }}>
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
          {/* Vertical center line — desktop & mobile */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(154,142,120,0.25) 10%, rgba(154,142,120,0.25) 90%, transparent)' }}
          />

          <div className="space-y-6 md:space-y-0">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-2 gap-0 items-center"
                >
                  {/* Left content */}
                  <div className={`flex items-center justify-end py-6 md:py-10 pr-6 md:pr-16`}>
                    {isLeft ? (
                      <div className="text-right max-w-[160px] md:max-w-none">
                        <p className="font-serif uppercase tracking-[0.1em] md:tracking-[0.15em] text-sm md:text-lg font-bold mb-1 md:mb-2" style={{ color: 'var(--color-wedding-accent-light)' }}>
                          {event.time}
                        </p>
                        <p className="font-script text-[1.4rem] md:text-3xl leading-none" style={{ color: 'var(--color-wedding-illustration)' }}>
                          {event.title}
                        </p>
                      </div>
                    ) : event.image ? (
                      <div className="flex justify-center w-24 md:w-32">
                        <div className="rounded-2xl border border-[rgba(154,142,120,0.3)] shadow-sm overflow-hidden transition-transform duration-500 hover:scale-105">
                          <img src={event.image} alt="" className="w-full h-auto" />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Center illustration badge */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                    <div
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundColor: 'var(--color-wedding-bg)',
                        borderColor: 'rgba(154,142,120,0.4)',
                        color: 'var(--color-wedding-gold)',
                        boxShadow: '0 4px 12px rgba(92,96,72,0.08)'
                      }}
                    >
                      <div className="scale-[0.7] md:scale-100 flex items-center justify-center text-[var(--color-wedding-gold)]">
                        {event.icon}
                      </div>
                    </div>
                  </div>

                  {/* Right content */}
                  <div className={`flex items-center justify-start py-6 md:py-10 pl-6 md:pl-16`}>
                    {!isLeft ? (
                      <div className="text-left max-w-[160px] md:max-w-none">
                        <p className="font-serif uppercase tracking-[0.1em] md:tracking-[0.15em] text-sm md:text-lg font-bold mb-1 md:mb-2" style={{ color: 'var(--color-wedding-accent-light)' }}>
                          {event.time}
                        </p>
                        <p className="font-script text-[1.4rem] md:text-3xl leading-none" style={{ color: 'var(--color-wedding-illustration)' }}>
                          {event.title}
                        </p>
                      </div>
                    ) : event.image ? (
                      <div className="flex justify-center w-24 md:w-32">
                        <div className="rounded-2xl border border-[rgba(154,142,120,0.3)] shadow-sm overflow-hidden transition-transform duration-500 hover:scale-105">
                          <img src={event.image} alt="" className="w-full h-auto" style={{ filter: 'saturate(1.6) contrast(1.15)' }} />
                        </div>
                      </div>
                    ) : null}
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
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm font-bold font-serif mb-3" style={{ color: 'var(--color-wedding-accent)' }}>
            Jusqu'au bout de la nuit
          </p>
          <h3 className="font-script text-4xl mb-10" style={{ color: 'var(--color-wedding-accent)' }}>
            Danse & célébration
          </h3>
          <div className="flex justify-center">
            <div className="rounded-2xl border border-[rgba(154,142,120,0.3)] shadow-sm overflow-hidden w-48 md:w-64 max-w-full">
              <img src="/celebration.png" alt="Danse et Célébration" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" style={{ filter: 'saturate(1.3) contrast(1.1)' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
