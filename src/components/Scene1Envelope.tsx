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
        y: isOpen ? '-10vh' : 0,
        scale: isOpen ? 1.05 : 1 // Slight zoom for cinematic exit
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1 // Slight delay to let the flap open first
      }}
    >
      {/* 3D Perspective Wrapper for Envelope */}
      <motion.div 
        className="relative w-[88vw] max-w-[400px] aspect-[3/2] cursor-pointer"
        style={{ perspective: 1500 }}
        onClick={handleOpen}
        whileHover={!isOpen ? { scale: 1.02, y: -4 } : {}}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Inside Back of Envelope (Darker depth) */}
        <div 
          className="absolute inset-0 rounded-md shadow-2xl"
          style={{ backgroundColor: '#D8D1C0' }}
        />

        {/* The Invitation Card Inside */}
        <motion.div 
          className="absolute inset-2 sm:inset-3 bg-[#FDFBF7] rounded flex flex-col items-center justify-center p-2 sm:p-3 shadow-md"
          animate={isOpen ? { y: -40, opacity: 1 } : { y: 0, opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border border-[#C8A96E]/40 w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 text-center">
             <p className="uppercase tracking-[0.25em] text-[8px] sm:text-[10px] text-[#5C6048]/60 mb-1 sm:mb-2 font-serif">Invitation</p>
             <span className="font-script text-3xl sm:text-4xl text-[#C8A96E]">Selma & Jamil</span>
          </div>
        </motion.div>

        {/* Envelope Front Pocket (Side and Bottom Flaps) */}
        <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-xl">
          <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
            {/* Left flap */}
            <polygon points="0,0 150,110 0,200" fill="#E5DEC9" stroke="#DFD9C9" strokeWidth="1" strokeLinejoin="round" />
            {/* Right flap */}
            <polygon points="300,0 150,110 300,200" fill="#E5DEC9" stroke="#DFD9C9" strokeWidth="1" strokeLinejoin="round" />
            {/* Bottom flap */}
            <polygon points="0,200 150,120 300,200" fill="#E8E2D2" stroke="#DFD9C9" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Envelope Top Flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[60%] z-20 origin-top"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.64, 0, 0.08, 1] }}
        >
          {/* Front of flap */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
            <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 120" preserveAspectRatio="none">
              <polygon points="0,0 300,0 150,120" fill="#E3DCC8" stroke="#DFD9C9" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>
          
          {/* Back of flap (visible when rotated) */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
            <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 120" preserveAspectRatio="none">
              {/* Note: y-coordinates are inverted because it's rotated 180deg */}
              <polygon points="0,120 300,120 150,0" fill="#D8D1C0" />
            </svg>
          </div>

          {/* Wax Seal */}
          <motion.div
            className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 z-30"
            style={{ transformOrigin: 'center center' }}
            animate={
              isOpen
                ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
                : { scale: [1, 1.04, 1] }
            }
            transition={
              isOpen
                ? { duration: 0.5, ease: 'easeIn' }
                : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            }
          >
            {/* Rich Organic Wax Seal SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
              <defs>
                <radialGradient id="waxGradient" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#9b2d2d" />
                  <stop offset="50%" stopColor="#7A1D1D" />
                  <stop offset="100%" stopColor="#4a1111" />
                </radialGradient>
              </defs>
              {/* Organic border shape */}
              <path
                d="M 50 4 C 68 2, 84 12, 92 28 C 100 44, 94 65, 82 80 C 72 95, 54 96, 37 92 C 18 86, 4 68, 8 50 C 12 30, 24 10, 50 4 Z"
                fill="url(#waxGradient)"
              />
              {/* Inner ring */}
              <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              {/* Initials */}
              <text
                x="50"
                y="58"
                fontFamily="var(--font-script)"
                fontSize="26"
                fill="#F3EFE4"
                textAnchor="middle"
                fontWeight="normal"
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
              >
                S&J
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Incitation Text Label */}
      <motion.p
        className="absolute bottom-8 sm:bottom-16 uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-serif text-[#5C6048] select-none"
        animate={
          isOpen
            ? { opacity: 0, y: 10 }
            : { opacity: [0.4, 0.9, 0.4] }
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
