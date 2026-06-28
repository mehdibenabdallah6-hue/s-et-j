import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[url('/bg-hero.png')] bg-cover bg-bottom bg-no-repeat">
      <div className="absolute inset-0 bg-wedding-bg/40 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center -mt-32">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-script text-7xl md:text-9xl text-wedding-accent mb-4 leading-tight mt-12"
        >
          Selma <br className="md:hidden" />
          <span className="font-serif text-3xl md:text-5xl mx-4 italic text-wedding-illustration block md:inline my-4 md:my-0">&</span>
          <br className="md:hidden" />
          Jamil
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 border-t border-wedding-accent pt-6 text-center"
        >
          <div className="font-serif small-caps text-lg tracking-[0.05em] text-wedding-accent space-y-2">
            <p>Samedi 12 Septembre 2026 — 17h00</p>
            <p>12 Rue des Marguerites, Anfa, Casablanca</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
