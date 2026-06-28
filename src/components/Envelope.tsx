import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-wedding-bg)' }}
        >
          {/* Dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(154,142,120,0.25) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(92,96,72,0.10) 100%)',
            }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center cursor-pointer select-none"
            onClick={handleOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Envelope card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="w-80 sm:w-[420px] bg-[var(--color-wedding-accent)] border border-[rgba(243,237,226,0.25)] shadow-2xl relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '7/5' }}
            >
              {/* Envelope V-flap decoration */}
              <div className="absolute top-0 left-0 w-full overflow-hidden opacity-90" style={{ height: '45%' }}>
                <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full" fill="none">
                  <path d="M 0 0 L 200 130 L 400 0" stroke="rgba(243,237,226,0.2)" strokeWidth="1.5" />
                  <path d="M 0 0 L 200 130 L 400 0 L 400 200 L 0 200 Z" fill="rgba(243,237,226,0.015)" />
                </svg>
              </div>

              {/* Inner card content */}
              <div className="absolute inset-4 border border-[rgba(243,237,226,0.15)] rounded-xl flex flex-col items-center justify-center text-center p-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-3 font-serif"
                  style={{ color: 'rgba(243,237,226,0.7)' }}
                >
                  Invitation au mariage de
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="font-script text-5xl sm:text-7xl leading-tight"
                  style={{ color: 'var(--color-wedding-gold)' }}
                >
                  Selma & Jamil
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className="uppercase tracking-[0.25em] text-[10px] sm:text-xs mt-3 font-serif"
                  style={{ color: 'rgba(243,237,226,0.7)' }}
                >
                  12 Septembre 2026
                </motion.p>

                {/* Animated icon */}
                <motion.div
                  className="mt-6 w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-300"
                  style={{ borderColor: 'rgba(243,237,226,0.3)', backgroundColor: 'rgba(243,237,226,0.04)' }}
                  whileHover={{ backgroundColor: 'rgba(243,237,226,0.1)', borderColor: 'var(--color-wedding-gold)' }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MailOpen size={16} style={{ color: 'var(--color-wedding-gold)' }} />
                </motion.div>
              </div>
            </motion.div>

            {/* CTA label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
              className="mt-7 uppercase tracking-[0.3em] text-xs font-serif"
              style={{ color: 'var(--color-wedding-accent)' }}
            >
              Ouvrir l'invitation
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
