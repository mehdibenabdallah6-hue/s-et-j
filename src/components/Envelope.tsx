import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas golden dust & flower petals particles
  useEffect(() => {
    if (isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Volumetric light rays rotation
    gsap.to('.light-rays', {
      rotation: 360,
      duration: 280,
      repeat: -1,
      ease: 'none',
    });

    // Ambient background color breathing (luxury warm glow)
    gsap.to(containerRef.current, {
      backgroundColor: '#ede6d3',
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Elegant floating idle animation for the envelope
    gsap.to(envelopeRef.current, {
      y: -6,
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Shadow breathing
    gsap.to(envelopeRef.current, {
      boxShadow: '0 30px 60px rgba(92, 96, 72, 0.16)',
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // CTA subtle pulse
    gsap.to('.cta-label', {
      opacity: 0.35,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    interface DustParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }

    interface PetalParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      angle: number;
      rSpeed: number;
      opacity: number;
    }

    const dustParticles: DustParticle[] = [];
    const petalParticles: PetalParticle[] = [];

    // Initialize gold dust
    for (let i = 0; i < 45; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.12 + 0.04),
        alpha: Math.random() * 0.4 + 0.1,
        alphaSpeed: Math.random() * 0.006 + 0.002,
      });
    }

    // Initialize jasmine/rose petals
    for (let i = 0; i < 8; i++) {
      petalParticles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 4 + 5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        rSpeed: (Math.random() - 0.5) * 0.005,
        opacity: Math.random() * 0.2 + 0.05,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dust
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.6 || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 110, ${p.alpha})`;
        ctx.fill();
      });

      // Petals
      petalParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 142, 120, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  // Mouse tilt parallax for cinematic depth
  useEffect(() => {
    if (isOpen || isAnimating) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(envelopeRef.current, {
        rotateY: x * 8,
        rotateX: -y * 8,
        x: x * 10,
        y: y * 10,
        duration: 1.2,
        ease: 'power2.out',
      });

      gsap.to('.light-rays', {
        x: -x * 15,
        y: -y * 15,
        duration: 1.4,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen, isAnimating]);

  // Premium hover mechanics
  const handleMouseEnter = () => {
    if (isAnimating || isOpen) return;
    gsap.killTweensOf(envelopeRef.current);
    
    gsap.to(envelopeRef.current, {
      y: -10,
      scale: 1.025,
      boxShadow: '0 35px 70px rgba(92, 96, 72, 0.20)',
      duration: 0.7,
      ease: 'power3.out',
    });

    gsap.to('.wax-seal-half', {
      filter: 'brightness(1.1) drop-shadow(0 6px 12px rgba(0,0,0,0.3))',
      scale: 1.04,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (isAnimating || isOpen) return;

    gsap.to(envelopeRef.current, {
      y: 0,
      scale: 1.0,
      boxShadow: '0 20px 40px rgba(92, 96, 72, 0.12)',
      duration: 0.9,
      ease: 'power3.out',
      onComplete: () => {
        if (!isAnimating) {
          gsap.to(envelopeRef.current, {
            y: -6,
            duration: 3.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        }
      }
    });

    gsap.to('.wax-seal-half', {
      filter: 'brightness(1.0) drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      scale: 1.0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  // Cinematic unfolding sequence (slow, weighted, and emotional)
  const handleOpen = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    gsap.killTweensOf(envelopeRef.current);
    gsap.killTweensOf('.light-rays');

    const tl = gsap.timeline({
      onComplete: () => {
        onOpen();
        setIsOpen(true);
      },
    });

    // 1. Camera moves closer to the envelope
    tl.to(envelopeRef.current, {
      scale: 1.05,
      y: -5,
      duration: 0.7,
      ease: 'power3.out',
    });

    // 2. Wax seal splits apart naturally
    tl.to('.seal-top-half', {
      y: -12,
      rotate: -8,
      opacity: 0,
      duration: 1.0,
      ease: 'power4.inOut',
    }, 'break');

    tl.to('.seal-bottom-half', {
      y: 12,
      rotate: 8,
      opacity: 0,
      duration: 1.0,
      ease: 'power4.inOut',
    }, 'break');

    // 3. Top flap rotates open slowly in 3D
    tl.to('.envelope-top-flap', {
      rotateX: -180,
      duration: 1.5,
      ease: 'power4.inOut',
    }, 'break+=0.1');

    // Soften shadows during fold
    tl.to(envelopeRef.current, {
      boxShadow: '0 40px 80px rgba(0, 0, 0, 0.18)',
      duration: 1.5,
    }, 'break+=0.1');

    // 4. Invitation card slowly slides out of the sleeve with premium inertia
    tl.set('.envelope-card', { zIndex: 35 });
    tl.to('.envelope-card', {
      y: '-76%',
      duration: 1.8,
      ease: 'power4.out',
    }, 'slide');

    // Soften rays to clean focus
    tl.to('.light-rays', {
      opacity: 0,
      duration: 1.2,
    }, 'slide');

    // 5. Expand card to fill entire screen and transform to Hero
    tl.to('.envelope-back, .envelope-front, .envelope-top-flap, .cta-label', {
      opacity: 0,
      y: 150,
      scale: 0.8,
      duration: 1.4,
      ease: 'power4.inOut',
    }, 'zoom');

    tl.to('.card-text', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    }, 'zoom');

    tl.to('.envelope-card', {
      scale: 4.8,
      y: '0%',
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      inset: 0,
      borderRadius: 0,
      duration: 1.6,
      ease: 'power4.inOut',
    }, 'zoom');

    // Fade entire overlay screen to reveal website Hero
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.out',
    });
  };

  // Wax seal SVG paths (reusable)
  const renderWaxSealHalf = (clipId: string) => (
    <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
      <defs>
        <radialGradient id="goldGradient" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F8E6B8" />
          <stop offset="35%" stopColor="#D4B67C" />
          <stop offset="70%" stopColor="#B39359" />
          <stop offset="100%" stopColor="#7E6135" />
        </radialGradient>
        <clipPath id="clip-top-half">
          <rect x="0" y="0" width="100" height="50" />
        </clipPath>
        <clipPath id="clip-bottom-half">
          <rect x="0" y="50" width="100" height="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* Organic irregular wax contour */}
        <path
          d="M 50 10 C 65 8, 77 13, 84 26 C 91 38, 86 57, 78 70 C 69 84, 54 91, 37 87 C 21 83, 11 68, 10 50 C 9 32, 19 16, 36 11 C 41 9, 45 11, 50 10 Z"
          fill="url(#goldGradient)"
        />
        {/* Inner concentric ring */}
        <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        {/* Initials */}
        <text
          x="50"
          y="57"
          fontFamily="'Parisienne', cursive"
          fontSize="23"
          fill="rgba(255,255,255,0.85)"
          textAnchor="middle"
          fontWeight="bold"
        >
          S & J
        </text>
      </g>
    </svg>
  );

  return (
    <>
      {!isOpen && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-wedding-bg)' }}
        >
          {/* Animated Ambient Particles */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Sunbeams / Volumetric Light */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
            <div
              className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-no-repeat pointer-events-none light-rays"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(200,169,110,0.03) 12deg, transparent 32deg, transparent 90deg, rgba(200,169,110,0.04) 110deg, transparent 130deg, transparent)',
              }}
            />
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(92,96,72,0.14) 100%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Modern Layered Sleeve Envelope */}
            <div
              ref={envelopeRef}
              className="relative w-80 sm:w-[420px] shadow-2xl rounded-2xl cursor-pointer envelope-container select-none"
              style={{
                aspectRatio: '7/5',
                perspective: '1500px',
                transformStyle: 'preserve-3d',
                boxShadow: '0 20px 40px rgba(92, 96, 72, 0.12)',
              }}
              onClick={handleOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Inside back lining of the sleeve */}
              <div
                className="absolute inset-0 bg-[var(--color-wedding-accent)] border border-[rgba(243,237,226,0.18)] rounded-2xl z-10 envelope-back"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* The Gold-Foil Pressed Invitation Card inside */}
              <div
                className="absolute inset-4 bg-[#F3EDE2] shadow-md z-15 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-[rgba(92,96,72,0.08)] envelope-card"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0px)',
                }}
              >
                {/* Gold border inset for luxury look */}
                <div className="absolute inset-3 border border-[var(--color-wedding-gold)]/25 rounded-lg pointer-events-none" />
                
                <div className="card-text flex flex-col items-center justify-center w-full h-full z-10">
                  <p className="uppercase tracking-[0.3em] text-[9px] sm:text-[10px] mb-3 font-serif text-[var(--color-wedding-accent)]/80">
                    Invitation au mariage de
                  </p>
                  <h1 className="font-script text-5xl sm:text-7xl leading-tight text-[var(--color-wedding-gold)]">
                    Selma & Jamil
                  </h1>
                  <p className="uppercase tracking-[0.25em] text-[9px] sm:text-[10px] mt-3 font-serif text-[var(--color-wedding-accent)]/80">
                    12 Septembre 2026
                  </p>
                </div>
              </div>

              {/* Bottom pocket sleeve (covers bottom half of card) */}
              <div
                className="absolute bottom-0 left-0 w-full h-[55%] bg-[var(--color-wedding-accent)] rounded-b-2xl border-t border-[rgba(243,237,226,0.18)] z-20 shadow-[0_-6px_25px_rgba(0,0,0,0.08)] envelope-front"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Thin gold trim line at top edge */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-wedding-gold)] opacity-30" />
                
                {/* Stationary bottom half of the wax seal */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none z-40 wax-seal-half seal-bottom-half">
                  {renderWaxSealHalf('clip-bottom-half')}
                </div>
              </div>

              {/* Top opening flap (folds up) */}
              <div
                className="absolute top-0 left-0 w-full h-[45%] bg-[var(--color-wedding-accent)] rounded-t-2xl z-30 origin-top border-b border-[rgba(243,237,226,0.14)] envelope-top-flap"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Thin gold trim line at bottom edge */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-wedding-gold)] opacity-30" />

                {/* Rotating top half of the wax seal */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-16 h-16 pointer-events-none z-40 wax-seal-half seal-top-half">
                  {renderWaxSealHalf('clip-top-half')}
                </div>
              </div>
            </div>

            {/* Premium CTA text label */}
            <p className="mt-8 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-serif text-[var(--color-wedding-accent)] pointer-events-none select-none cta-label opacity-75">
              Cliquez pour ouvrir l'invitation
            </p>
          </div>
        </div>
      )}
    </>
  );
}
