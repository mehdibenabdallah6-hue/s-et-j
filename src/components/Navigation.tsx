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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-wedding-illustration/20 ${
          isScrolled ? 'bg-wedding-bg/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex md:justify-center justify-between items-center relative">
          <a href="#accueil" onClick={(e) => scrollTo(e, '#accueil')} className="md:absolute md:left-6 font-script text-3xl text-wedding-accent">
            S & J
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="font-serif uppercase text-[11px] tracking-[0.2em] text-wedding-illustration hover:text-wedding-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-wedding-accent p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-wedding-bg pt-24 px-6 md:hidden flex flex-col items-center"
          >
            <nav className="flex flex-col space-y-8 text-center w-full mt-12">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="font-serif uppercase text-lg tracking-[0.2em] text-wedding-accent border-b border-wedding-illustration/20 pb-4"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto mb-12">
              <p className="font-script text-3xl text-wedding-accent/50">Selma & Jamil</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
