import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-bg"
        >
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]" />
          
          <motion.div 
            className="relative z-10 flex flex-col items-center cursor-pointer"
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-64 h-48 sm:w-80 sm:h-60 bg-wedding-bg border border-wedding-illustration rounded-sm shadow-xl flex items-center justify-center relative overflow-hidden">
              {/* Flap of the envelope */}
              <div className="absolute top-0 left-0 w-full h-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-1/2 text-wedding-illustration opacity-30 stroke-current" fill="none">
                  <path d="M 0 0 L 50 100 L 100 0" strokeWidth="1" />
                </svg>
              </div>
              
              <div className="text-center p-6 border border-wedding-illustration/30 m-4 rounded-sm bg-wedding-bg/80 backdrop-blur-sm z-10">
                <h1 className="font-script text-4xl sm:text-5xl text-wedding-accent mb-2">S & J</h1>
                <p className="font-serif text-sm sm:text-base uppercase tracking-[0.2em] text-wedding-illustration">12 Septembre 2026</p>
                <div className="mt-4 flex justify-center">
                  <div className="w-10 h-10 rounded-full border border-wedding-accent flex items-center justify-center">
                    <MailOpen size={18} className="text-wedding-accent" />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="mt-6 font-serif uppercase tracking-widest text-xs text-wedding-accent animate-pulse">
              Ouvrir l'invitation
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
