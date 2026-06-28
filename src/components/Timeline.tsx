import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

const events = [
  { time: '17H00', title: 'Accueil des invités' },
  { time: '19H00', title: 'Accueil de la famille du marié' },
  { time: '19H30', title: 'Entrée de la mariée' },
  { time: '22H00', title: 'Doura' },
  { time: '23H00', title: 'Dîner' },
  { time: '00H30', title: 'Robe Blanche' },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="programme" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-3xl relative">
        <div className="text-center mb-16">
          <span className="font-serif uppercase tracking-widest text-xs text-wedding-illustration">Wedding</span>
          <h2 className="font-script text-6xl text-wedding-accent mt-2">Timeline</h2>
          <div className="text-wedding-illustration mt-4">❖</div>
        </div>

        <div className="relative py-10">
          {/* Sinuous SVG Path Background */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[300px] pointer-events-none hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 300 800" preserveAspectRatio="none" className="stroke-wedding-illustration" fill="none" strokeWidth="1" strokeDasharray="4 4">
              <path d="M150,0 C250,100 50,200 150,300 C250,400 50,500 150,600 C250,700 50,800 150,800" />
            </svg>
          </div>

          <div className="absolute top-0 bottom-0 left-8 md:hidden w-px bg-wedding-illustration/30"></div>

          <div className="space-y-16 md:space-y-0 relative z-10">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center md:h-32 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Mobile Dot */}
                  <div className="absolute left-8 -translate-x-1/2 w-3 h-3 rounded-full bg-wedding-accent md:hidden"></div>

                  <div className={`pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} flex flex-col justify-center`}>
                    {/* Desktop Dot (placed via absolute to follow a sine wave roughly) */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-wedding-accent ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`} 
                         style={{ 
                           marginLeft: isEven ? '45px' : '-45px', // Approximating the sine wave curve
                         }} 
                    />
                    
                    <span className="font-serif uppercase tracking-[0.2em] text-lg text-wedding-accent font-medium">
                      {event.time}
                    </span>
                    <span className="font-script text-3xl text-wedding-illustration mt-2">
                      {event.title}
                    </span>
                    <div className={`text-wedding-illustration/50 text-xs mt-3 ${isEven ? 'md:ml-auto' : ''}`}>❖</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <span className="font-serif uppercase tracking-[0.2em] text-xs text-wedding-illustration">Jusqu'au bout de la nuit</span>
          <h3 className="font-script text-4xl text-wedding-accent mt-4">Danse & célébration</h3>
          <div className="text-wedding-illustration mt-4">♡</div>
        </motion.div>
      </div>
    </section>
  );
}
