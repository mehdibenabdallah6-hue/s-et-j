import React from 'react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24 pb-16 text-center" style={{ backgroundColor: 'var(--color-wedding-accent)' }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(243,237,226,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top diamond divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-10 h-10 rotate-45 flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-wedding-accent)', border: '1px solid rgba(243,237,226,0.2)' }}
        >
          <div
            className="w-5 h-5 rotate-0"
            style={{ border: '1px solid rgba(243,237,226,0.2)' }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-lg relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Names */}
          <h2
            className="font-script mb-2 leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 5.5rem)', color: 'var(--color-wedding-bg)' }}
          >
            Selma & Jamil
          </h2>

          {/* Date & location */}
          <div
            className="flex flex-col items-center gap-1 mb-10 font-serif uppercase tracking-[0.25em] text-[10px]"
            style={{ color: 'rgba(243,237,226,0.6)' }}
          >
            <p>Le 12 Septembre 2026</p>
            <p>Anfa, Casablanca</p>
          </div>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-10 opacity-30">
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-bg)' }} />
            <span style={{ color: 'var(--color-wedding-bg)' }}>♡</span>
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-bg)' }} />
          </div>

        </motion.div>
      </div>
    </footer>
  );
}
