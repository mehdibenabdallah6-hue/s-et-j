import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Scene1EnvelopeProps {
  onOpen: () => void;
}

export default function Scene1Envelope({ onOpen }: Scene1EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ 
        backgroundColor: '#F3EFE4',
        pointerEvents: isOpen ? 'none' : 'auto' 
      }}
      animate={{ 
        opacity: isOpen ? 0 : 1,
        y: isOpen ? '-10vh' : 0 
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] 
      }}
    >
      {/* 3D Perspective Wrapper for Envelope */}
      <div 
        className="relative w-80 h-56 max-w-[90vw] cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={handleOpen}
      >
        {/* Envelope Body */}
        <div 
          className="absolute inset-0 rounded-b-lg shadow-2xl border border-[#DFD9C9]"
          style={{ backgroundColor: '#E8E2D2' }}
        />

        {/* Invitation Text inside Envelope (shows briefly behind flap before opening) */}
        <div className="absolute inset-4 flex flex-col items-center justify-center text-center opacity-40 select-none">
          <p className="font-serif text-xs uppercase tracking-widest text-[#5C6048]">
            S & J
          </p>
        </div>

        {/* Envelope Flap (Triangular fold) */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 z-20 origin-top rounded-t-lg"
          style={{ 
            backgroundColor: '#E3DCC8',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d'
          }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Wax Seal centered on the tip of the flap */}
          <motion.div
            className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-md z-30"
            style={{ 
              backgroundColor: '#7A1D1D',
              border: '2px solid #5A1515',
              transformOrigin: 'center center'
            }}
            animate={
              isOpen
                ? { scale: [1, 1.2, 0], opacity: 0 }
                : { scale: [1, 1.05, 1] }
            }
            transition={
              isOpen
                ? { duration: 0.6, ease: 'easeOut' }
                : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            }
          >
            <span 
              className="font-script text-[#F3EFE4] text-xl font-bold select-none"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              S&J
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Incitation Text Label */}
      <motion.p
        className="absolute bottom-16 uppercase tracking-[0.3em] text-xs font-serif text-[#5C6048]/80 select-none"
        animate={
          isOpen
            ? { opacity: 0 }
            : { opacity: [0.5, 1, 0.5] }
        }
        transition={
          isOpen
            ? { duration: 0.2 }
            : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
        }
      >
        Touchez pour ouvrir
      </motion.p>
    </motion.div>
  );
}
