import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation as NavIcon } from 'lucide-react';

export default function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="lieu" className="py-24 md:py-36 relative" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(154,142,120,0.25), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(154,142,120,0.25), transparent)' }} />

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-xs font-serif mb-3" style={{ color: 'var(--color-wedding-illustration)' }}>
            Où nous rejoindre
          </p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--color-wedding-accent)' }}>
            Le Lieu
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5 opacity-30">
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
            <span style={{ color: 'var(--color-wedding-gold)' }}>✦</span>
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-2/5 text-center md:text-left"
          >
            {/* Address */}
            <div className="mb-8">
              <p
                className="font-serif uppercase tracking-[0.25em] text-xs mb-4"
                style={{ color: 'var(--color-wedding-illustration)' }}
              >
                Réception
              </p>
              <div className="w-8 h-px mb-6 mx-auto md:mx-0" style={{ backgroundColor: 'var(--color-wedding-gold)', opacity: 0.5 }} />
              <p
                className="font-serif text-xl leading-relaxed"
                style={{ color: 'var(--color-wedding-accent)' }}
              >
                12 Rue des Marguerites<br />
                Anfa, Casablanca<br />
                <span style={{ color: 'var(--color-wedding-illustration)' }}>Maroc</span>
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://maps.google.com/?q=33.5882,-7.6614"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-serif transition-all duration-300 group"
              style={{ borderColor: 'var(--color-wedding-accent)', color: 'var(--color-wedding-accent)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-wedding-accent)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-wedding-bg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-wedding-accent)';
              }}
            >
              <MapPin size={14} />
              Itinéraire
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-3/5 relative"
            style={{ height: '420px' }}
          >
            {/* Frame */}
            <div
              className="absolute inset-0 rounded-sm overflow-hidden flex items-center justify-center"
              style={{
                border: '1px solid rgba(154,142,120,0.25)',
                boxShadow: '0 20px 60px rgba(92,96,72,0.12)',
                backgroundColor: 'var(--color-wedding-bg)',
              }}
            >
              {/* Loader */}
              {!mapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60 z-0">
                  <div className="w-8 h-8 rounded-full border-[3px] border-[var(--color-wedding-gold)] border-t-transparent animate-spin mb-4" />
                  <span className="font-serif text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-wedding-illustration)' }}>Chargement...</span>
                </div>
              )}

              <iframe
                src="https://maps.google.com/maps?q=33.5882,-7.6614&z=15&output=embed&hl=fr"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`grayscale transition-opacity duration-1000 relative z-10 ${mapLoaded ? 'opacity-85' : 'opacity-0'}`}
                title="Anfa, Casablanca — Lieu de réception"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: 'rgba(200,169,110,0.5)' }} />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: 'rgba(200,169,110,0.5)' }} />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: 'rgba(200,169,110,0.5)' }} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: 'rgba(200,169,110,0.5)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
