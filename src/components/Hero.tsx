import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '18%']);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -60]);

  // Responsive background position
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToInvitation = () => {
    const el = document.querySelector('#invitation');
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background — plein écran sans cadre, avec fondu calculé sur desktop */}
      <motion.div
        className="absolute inset-0 bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/bg-hero.png')",
          backgroundSize: isMobile ? 'cover' : 'auto 140%',
          backgroundPosition: isMobile ? 'center' : 'center bottom',
          y: bgY,
        }}
      >
        {/* Horizontal edge blending overlays for desktop */}
        {!isMobile && (
          <>
            <div 
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{ 
                left: 0, 
                right: 'calc(50% + 36.66vh)', 
                background: 'linear-gradient(to right, #F3EDE2, #F3EDE2 calc(100% - 10vh), rgba(243,237,226,0))' 
              }}
            />
            <div 
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{ 
                right: 0, 
                left: 'calc(50% + 36.66vh)', 
                background: 'linear-gradient(to left, #F3EDE2, #F3EDE2 calc(100% - 10vh), rgba(243,237,226,0))' 
              }}
            />
          </>
        )}
      </motion.div>

      {/* Gradient overlay to transition to the next section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(243,237,226,0.2) 0%, rgba(243,237,226,0.4) 60%, rgba(243,237,226,0.95) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 -mt-16"
      >
        {/* Pre-title removed */}

        {/* Names */}
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-script leading-none py-2 px-4 overflow-visible"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 9.5rem)',
            color: 'var(--color-wedding-accent)',
          }}
        >
          Selma
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-6 my-3"
        >
          <span className="block h-px w-12 opacity-40" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          <span className="font-serif text-2xl md:text-3xl italic" style={{ color: 'var(--color-wedding-illustration)' }}>&</span>
          <span className="block h-px w-12 opacity-40" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
        </motion.div>

        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-script leading-none py-2 px-4 overflow-visible"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 9.5rem)',
            color: 'var(--color-wedding-accent)',
          }}
        >
          Jamil
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 relative rounded-3xl mx-4 md:mx-0 shadow-2xl"
        >
          <div 
            className="relative px-8 py-8 md:px-20 md:py-10 text-center rounded-3xl"
            style={{ 
              backgroundColor: 'var(--color-wedding-accent)',
              boxShadow: '0 25px 50px rgba(92,96,72,0.3)'
            }}
          >
            <p
              className="font-serif uppercase tracking-[0.1em] md:tracking-[0.2em] text-xl md:text-2xl font-bold mb-4"
              style={{ color: 'var(--color-wedding-bg)' }}
            >
              Samedi 12 Septembre 2026
            </p>
            <p
              className="font-script mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-wedding-bg)' }}
            >
              17h00
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-4 opacity-30">
              <span className="w-12 md:w-20 h-px" style={{ backgroundColor: 'var(--color-wedding-bg)' }}></span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-wedding-bg)' }}></span>
              <span className="w-12 md:w-20 h-px" style={{ backgroundColor: 'var(--color-wedding-bg)' }}></span>
            </div>

            <p
              className="font-serif text-[13px] md:text-base tracking-[0.05em] md:tracking-[0.15em] font-medium"
              style={{ color: 'rgba(243,237,226,0.8)' }}
            >
              12 Rue des Marguerites, Anfa, Casablanca
            </p>
          </div>
        </motion.div>

        {/* Countdown — below the card */}
        <Countdown />
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToInvitation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.8, duration: 0.6 }, y: { delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-wedding-illustration)' }}
        aria-label="Défiler vers le bas"
      >
        <span className="uppercase tracking-[0.25em] text-[9px] font-serif">Défiler</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
