import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface Scene1EnvelopeProps {
  onOpen: () => void;
}

export default function Scene1Envelope({ onOpen }: Scene1EnvelopeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (isPlaying || isEnded) return;
    
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Lecture de la vidéo impossible", e);
        // Fallback in case browser completely blocks playback
        handleVideoEnd();
      });
    }
  };

  const handleVideoEnd = () => {
    setIsEnded(true);
    setTimeout(() => {
      onOpen();
    }, 1200); // Attendre la fin du fondu pour révéler le site
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer bg-[#F3EFE4]"
      animate={{ 
        opacity: isEnded ? 0 : 1,
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }}
      onClick={handlePlay}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/envelope-intro.mp4"
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Incitation Text Label */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-24 pointer-events-none"
        animate={{ opacity: isPlaying ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="uppercase tracking-[0.3em] text-[10px] sm:text-xs font-serif text-white select-none drop-shadow-md"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          Touchez pour ouvrir
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
