import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function RSVP() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate submission - In a real scenario, connect this to Formspree:
    // <form action="https://formspree.io/f/your_form_id" method="POST">
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="rsvp" className="py-24 relative bg-wedding-bg">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-serif uppercase tracking-[0.2em] text-xs text-wedding-illustration">Répondez s'il vous plaît</span>
          <h2 className="font-script text-6xl text-wedding-accent mt-2 mb-12">RSVP</h2>
          
          <div className="bg-white/30 border border-wedding-accent p-8 md:p-12 backdrop-blur-sm relative">
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-wedding-accent"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-wedding-accent"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-wedding-accent"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-wedding-accent"></div>

            {status === 'success' ? (
              <div className="py-16 text-wedding-accent font-serif">
                <p className="text-2xl italic mb-4">Merci de votre réponse.</p>
                <p className="uppercase tracking-widest text-xs">Nous avons hâte de célébrer avec vous.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-serif text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="uppercase tracking-widest text-xs text-wedding-accent">Nom(s) & Prénom(s)</label>
                    <input required type="text" className="w-full bg-transparent border-b border-wedding-illustration/50 py-2 focus:outline-none focus:border-wedding-accent transition-colors text-wedding-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="uppercase tracking-widest text-xs text-wedding-accent">Email</label>
                    <input required type="email" className="w-full bg-transparent border-b border-wedding-illustration/50 py-2 focus:outline-none focus:border-wedding-accent transition-colors text-wedding-accent" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="uppercase tracking-widest text-xs text-wedding-accent block">Serez-vous présent(s) ?</label>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer text-wedding-illustration hover:text-wedding-accent">
                      <input type="radio" name="presence" value="oui" required className="accent-wedding-accent" />
                      <span className="italic text-lg">Oui, avec joie</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-wedding-illustration hover:text-wedding-accent">
                      <input type="radio" name="presence" value="non" required className="accent-wedding-accent" />
                      <span className="italic text-lg">Non, avec regret</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="uppercase tracking-widest text-xs text-wedding-accent">Allergies / Régime alimentaire</label>
                  <textarea rows={2} className="w-full bg-transparent border-b border-wedding-illustration/50 py-2 focus:outline-none focus:border-wedding-accent transition-colors text-wedding-accent resize-none"></textarea>
                </div>

                <div className="pt-8 text-center">
                  <button 
                    disabled={status === 'submitting'}
                    type="submit" 
                    className="border border-wedding-accent px-12 py-3 uppercase tracking-[0.2em] text-xs text-wedding-accent hover:bg-wedding-accent hover:text-wedding-bg transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Envoi...' : 'Confirmer'}
                  </button>
                  <p className="mt-4 uppercase tracking-widest text-[10px] text-wedding-illustration">
                    Merci de répondre avant le 1er Août 2026
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Dress Code Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-12 border-b border-wedding-illustration/30"
        >
          <h3 className="font-script text-4xl text-wedding-accent mb-4">Dress Code</h3>
          <p className="font-serif uppercase tracking-[0.15em] text-sm text-wedding-illustration">
            Tenue de soirée élégante ou traditionnelle marocaine
          </p>
        </motion.div>
      </div>
    </section>
  );
}
