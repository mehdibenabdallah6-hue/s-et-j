import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'Invitation', href: '#invitation' },
  { name: 'Programme', href: '#programme' },
  { name: 'Lieu', href: '#lieu' },
  { name: 'RSVP', href: '#rsvp' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('#accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Active section tracking
      const sections = links.map(l => document.querySelector(l.href)).filter(Boolean);
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement;
        if (el && el.offsetTop <= scrollY) {
          setActive(links[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [isOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActive(href);
    const element = document.querySelector(href);
    if (element) {
      const top = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          backgroundColor: isScrolled ? 'rgba(243,237,226,0.92)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(154,142,120,0.2)' : '1px solid transparent',
          padding: isScrolled ? '14px 0' : '22px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex md:justify-center justify-between items-center relative">
          <a
            href="#accueil"
            onClick={(e) => scrollTo(e, '#accueil')}
            className="md:absolute md:left-6 flex items-center gap-2 font-serif text-2xl md:text-3xl transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-wedding-accent)' }}
          >
            <span>S</span>
            <span className="text-[0.55em] italic opacity-60">&amp;</span>
            <span>J</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="relative font-serif uppercase text-[11px] tracking-[0.22em] transition-colors duration-300"
                style={{ color: active === link.href ? 'var(--color-wedding-accent)' : 'var(--color-wedding-illustration)' }}
              >
                {link.name}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ backgroundColor: 'var(--color-wedding-gold)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-wedding-accent)' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden flex flex-col"
            style={{ backgroundColor: 'var(--color-wedding-bg)' }}
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                  className="font-serif uppercase text-xl tracking-[0.25em] transition-colors duration-300"
                  style={{ color: active === link.href ? 'var(--color-wedding-accent)' : 'var(--color-wedding-illustration)' }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pb-12"
            >
              <p className="font-script text-4xl opacity-20" style={{ color: 'var(--color-wedding-accent)' }}>
                Selma & Jamil
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
