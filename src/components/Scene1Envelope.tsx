import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface Scene1EnvelopeProps {
  onOpen: () => void;
}

export default function Scene1Envelope({ onOpen }: Scene1EnvelopeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionTriggered = useRef(false);

  const handlePlay = () => {
    if (isPlaying || transitionTriggered.current) return;
    
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
    if (transitionTriggered.current) return;
    transitionTriggered.current = true;
    setIsEnded(true);
    setTimeout(() => {
      onOpen();
    }, 1500); // Wait for the 1.5s fade out to complete before revealing the site
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || transitionTriggered.current) return;
    
    const timeRemaining = videoRef.current.duration - videoRef.current.currentTime;
    // Si la vidéo est à 1.5 seconde (ou moins) de la fin, on lance le fondu croisé
    if (timeRemaining <= 1.5) {
      handleVideoEnd();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer bg-[#F3EFE4]"
      animate={{ 
        opacity: isEnded ? 0 : 1,
      }}
      transition={{ 
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1]
      }}
      onClick={handlePlay}
    >
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-auto max-w-none md:w-full md:h-full md:object-cover mix-blend-multiply"
        src="/envelope-intro.mp4#t=0.001"
        preload="metadata"
        playsInline
        muted={!isPlaying} // On garde muted au début pour forcer iOS à précharger la frame
        onTimeUpdate={handleTimeUpdate}
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
