import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

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
        <div className="overflow-visible py-2 px-4">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-script leading-none"
            style={{
              fontSize: 'clamp(4.5rem, 14vw, 9.5rem)',
              color: 'var(--color-wedding-accent)',
            }}
          >
            Selma
          </motion.h1>
        </div>

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

        <div className="overflow-visible py-2 px-4">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-script leading-none"
            style={{
              fontSize: 'clamp(4.5rem, 14vw, 9.5rem)',
              color: 'var(--color-wedding-accent)',
            }}
          >
            Jamil
          </motion.h1>
        </div>

        {/* Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 px-6 py-5 md:px-12 md:py-6 text-center border-y"
          style={{ 
            borderColor: 'rgba(154,142,120,0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <p
            className="font-serif uppercase tracking-[0.15em] md:tracking-[0.2em] text-base md:text-xl font-bold mb-3"
            style={{ color: 'var(--color-wedding-accent)' }}
          >
            Samedi 12 Septembre 2026 <span className="opacity-40 mx-2">—</span> 17h00
          </p>
          <p
            className="font-serif text-sm md:text-base tracking-[0.05em] md:tracking-[0.1em] font-medium"
            style={{ color: 'var(--color-wedding-accent)' }}
          >
            12 Rue des Marguerites, Anfa, Casablanca
          </p>
        </motion.div>
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
