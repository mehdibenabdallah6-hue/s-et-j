import React, { useEffect, useRef, useState } from 'react';
import { MailOpen } from 'lucide-react';
import gsap from 'gsap';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particles & Ambient Animations
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

    // Subtle spin for light rays
    gsap.to('.light-rays', {
      rotation: 360,
      duration: 240,
      repeat: -1,
      ease: 'none',
    });

    // Pulse lighting (ambient brightness breathing)
    gsap.to(containerRef.current, {
      backgroundColor: '#f1ebd8',
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Floating envelope idle animation
    gsap.to(envelopeRef.current, {
      y: -5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Breathing shadow
    gsap.to(envelopeRef.current, {
      boxShadow: '0 25px 50px rgba(92, 96, 72, 0.15)',
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Twinkling CTA label
    gsap.to('.cta-label', {
      opacity: 0.35,
      duration: 2,
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

    // Create golden dust particles
    for (let i = 0; i < 40; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(Math.random() * 0.15 + 0.05),
        alpha: Math.random() * 0.4 + 0.1,
        alphaSpeed: Math.random() * 0.008 + 0.003,
      });
    }

    // Create drifting flower petals
    for (let i = 0; i < 10; i++) {
      petalParticles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 5 + 5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: Math.random() * 0.35 + 0.15,
        angle: Math.random() * Math.PI * 2,
        rSpeed: (Math.random() - 0.5) * 0.008,
        opacity: Math.random() * 0.25 + 0.08,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dust
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.65 || p.alpha < 0.1) {
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
        ctx.shadowBlur = 2;
        ctx.shadowColor = '#C8A96E';
        ctx.fill();
      });

      // Draw drifting petals
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

  // Mouse Parallax Effect
  useEffect(() => {
    if (isOpen || isAnimating) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      // Parallax rotation and tilt
      gsap.to(envelopeRef.current, {
        rotateY: x * 10,
        rotateX: -y * 10,
        x: x * 12,
        y: y * 12,
        duration: 1.0,
        ease: 'power2.out',
      });

      // Subtle opposite shift of background elements
      gsap.to('.light-rays', {
        x: -x * 20,
        y: -y * 20,
        duration: 1.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen, isAnimating]);

  // Hover Interactions
  const handleMouseEnter = () => {
    if (isAnimating || isOpen) return;
    
    // Stop the idle float timeline animation during hover
    gsap.killTweensOf(envelopeRef.current);
    
    gsap.to(envelopeRef.current, {
      y: -12,
      scale: 1.03,
      boxShadow: '0 35px 70px rgba(92, 96, 72, 0.22)',
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.to('.seal-left-half, .seal-right-half', {
      filter: 'brightness(1.1) drop-shadow(0 6px 12px rgba(0,0,0,0.3))',
      duration: 0.6,
    });
  };

  const handleMouseLeave = () => {
    if (isAnimating || isOpen) return;

    gsap.to(envelopeRef.current, {
      y: 0,
      scale: 1.0,
      boxShadow: '0 20px 40px rgba(92, 96, 72, 0.12)',
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        // Re-enable idle breathing
        if (!isAnimating) {
          gsap.to(envelopeRef.current, {
            y: -5,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        }
      }
    });

    gsap.to('.seal-left-half, .seal-right-half', {
      filter: 'brightness(1.0) drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
      duration: 0.8,
    });
  };

  // Cinematic Opening Sequence
  const handleOpen = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);

    // Disable mouse parallax
    gsap.killTweensOf(envelopeRef.current);
    gsap.killTweensOf('.light-rays');

    const tl = gsap.timeline({
      onComplete: () => {
        onOpen();
        setIsOpen(true);
      },
    });

    // 1. Zoom closer to envelope (Camera zooms in)
    tl.to(envelopeRef.current, {
      scale: 1.08,
      y: -10,
      duration: 0.5,
      ease: 'power2.out',
    });

    // 2. Break wax seal (anticipation then detach)
    tl.to('.seal-left-half', {
      x: -28,
      rotate: -12,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.inOut',
    }, 'break');
    tl.to('.seal-right-half', {
      x: 28,
      rotate: 12,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.inOut',
    }, 'break');

    // 3. Opening envelope flap (3D rotation)
    tl.to('.envelope-top-flap', {
      rotateX: -180,
      duration: 0.9,
      ease: 'power2.inOut',
    }, 'break+=0.25');

    // Soften shadows during open
    tl.to(envelopeRef.current, {
      boxShadow: '0 30px 65px rgba(0, 0, 0, 0.15)',
      duration: 0.9,
    }, 'break+=0.25');

    // 4. Card slides out of the pocket
    tl.set('.envelope-card', { zIndex: 35 });
    tl.to('.envelope-card', {
      y: '-80%',
      duration: 1.3,
      ease: 'power4.out',
    }, 'slide');

    // Soften ambient light
    tl.to('.light-rays', {
      opacity: 0,
      duration: 1.0,
    }, 'slide');

    // 5. Epic expansion & transition to Hero
    tl.to('.envelope-back, .envelope-front, .envelope-top-flap, .cta-label', {
      opacity: 0,
      y: 120,
      scale: 0.85,
      duration: 1.1,
      ease: 'power3.inOut',
    }, 'zoom');

    tl.to('.card-text', {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    }, 'zoom');

    // Scale card to fill the viewport
    tl.to('.envelope-card', {
      scale: 4.5,
      y: '0%',
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      inset: 0,
      borderRadius: 0,
      duration: 1.3,
      ease: 'power4.inOut',
    }, 'zoom');

    // Fade out the entire overlay container to reveal the Hero
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
    });
  };

  return (
    <>
      {!isOpen && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-wedding-bg)' }}
        >
          {/* Ambient Particles Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Volumetric light rays */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
            <div
              className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-no-repeat pointer-events-none light-rays"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(200,169,110,0.035) 15deg, transparent 35deg, transparent 90deg, rgba(200,169,110,0.045) 115deg, transparent 135deg, transparent)',
              }}
            />
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(92,96,72,0.12) 100%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* 3D Envelope Container */}
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
              {/* Back flap layer */}
              <div
                className="absolute inset-0 bg-[var(--color-wedding-accent)] border border-[rgba(243,237,226,0.25)] rounded-2xl z-10 envelope-back"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Invitation Card */}
              <div
                className="absolute inset-4 bg-[#F3EDE2] shadow-md z-15 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-[rgba(92,96,72,0.08)] envelope-card"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0px)',
                }}
              >
                <div className="card-text flex flex-col items-center justify-center w-full h-full">
                  <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-3 font-serif text-[var(--color-wedding-accent)]/85">
                    Invitation au mariage de
                  </p>
                  <h1 className="font-script text-5xl sm:text-7xl leading-tight text-[var(--color-wedding-gold)]">
                    Selma & Jamil
                  </h1>
                  <p className="uppercase tracking-[0.25em] text-[10px] sm:text-xs mt-3 font-serif text-[var(--color-wedding-accent)]/85">
                    12 Septembre 2026
                  </p>
                </div>
              </div>

              {/* Front pocket flaps */}
              <div
                className="absolute inset-0 z-20 pointer-events-none envelope-front"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg viewBox="0 0 400 286" className="w-full h-full filter drop-shadow-md" fill="none">
                  <path d="M 0 0 L 200 143 L 0 286 Z" fill="var(--color-wedding-accent)" stroke="rgba(243,237,226,0.12)" strokeWidth="1" />
                  <path d="M 400 0 L 200 143 L 400 286 Z" fill="var(--color-wedding-accent)" stroke="rgba(243,237,226,0.12)" strokeWidth="1" />
                  <path d="M 0 286 L 200 135 L 400 286 Z" fill="var(--color-wedding-accent)" stroke="rgba(243,237,226,0.15)" strokeWidth="1" />
                </svg>
              </div>

              {/* Top envelope flap */}
              <div
                className="absolute top-0 left-0 w-full h-[143px] origin-top z-30 envelope-top-flap"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <svg viewBox="0 0 400 143" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-sm" fill="none">
                  <path d="M 0 0 L 200 143 L 400 0 Z" fill="var(--color-wedding-accent)" stroke="rgba(243,237,226,0.15)" strokeWidth="1.5" />
                </svg>

                {/* Wax seal */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-16 h-16 pointer-events-none z-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                    <defs>
                      <radialGradient id="goldGradient" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#F6E0A4" />
                        <stop offset="40%" stopColor="#C8A96E" />
                        <stop offset="100%" stopColor="#8A6F3E" />
                      </radialGradient>
                      <clipPath id="clip-left">
                        <rect x="0" y="0" width="50" height="100" />
                      </clipPath>
                      <clipPath id="clip-right">
                        <rect x="50" y="0" width="50" height="100" />
                      </clipPath>
                    </defs>

                    {/* Left half */}
                    <g clipPath="url(#clip-left)" className="seal-left-half origin-[50px_50px]">
                      <path
                        d="M 50 10 C 65 8, 75 14, 82 25 C 89 36, 85 55, 78 68 C 70 82, 55 92, 38 88 C 22 84, 12 70, 10 52 C 8 35, 18 18, 35 12 C 40 10, 45 11, 50 10 Z"
                        fill="url(#goldGradient)"
                      />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      <text x="50" y="57" fontFamily="'Parisienne', cursive" fontSize="24" fill="rgba(255,255,255,0.85)" textAnchor="middle" fontWeight="bold">
                        S & J
                      </text>
                    </g>

                    {/* Right half */}
                    <g clipPath="url(#clip-right)" className="seal-right-half origin-[50px_50px]">
                      <path
                        d="M 50 10 C 65 8, 75 14, 82 25 C 89 36, 85 55, 78 68 C 70 82, 55 92, 38 88 C 22 84, 12 70, 10 52 C 8 35, 18 18, 35 12 C 40 10, 45 11, 50 10 Z"
                        fill="url(#goldGradient)"
                      />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                      <text x="50" y="57" fontFamily="'Parisienne', cursive" fontSize="24" fill="rgba(255,255,255,0.85)" textAnchor="middle" fontWeight="bold">
                        S & J
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Click to open label */}
            <p className="mt-8 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-serif text-[var(--color-wedding-accent)] pointer-events-none select-none cta-label opacity-75">
              Cliquez pour ouvrir l'invitation
            </p>
          </div>
        </div>
      )}
    </>
  );
}
