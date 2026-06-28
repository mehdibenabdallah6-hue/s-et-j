import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';

const inputClass = "w-full bg-transparent py-3 text-base font-serif transition-colors duration-300 focus:outline-none placeholder:italic placeholder:text-[rgba(154,142,120,0.45)]";
const labelClass = "block uppercase tracking-[0.2em] text-[11px] md:text-xs font-serif mb-2";

export default function RSVP() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', presence: '', guests: '1', allergies: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const presenceText = formData.presence === 'oui' ? 'Oui, avec joie ✓' : 'Non, avec regret ✗';
    const subject = encodeURIComponent(`RSVP Mariage S&J — ${formData.name}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nRSVP pour le mariage de Selma & Jamil :\n\n` +
      `Nom : ${formData.name}\nEmail : ${formData.email}\nPrésence : ${presenceText}\n` +
      `Nombre d'invités : ${formData.guests}\nAllergies : ${formData.allergies || 'Aucun'}\n\nCordialement,\n${formData.name}`
    );
    window.open(`mailto:contact@selma-jamil-mariage.ma?subject=${subject}&body=${body}`, '_blank');
    setTimeout(() => setStatus('success'), 900);
  };

  return (
    <section id="rsvp" className="py-24 md:py-36 relative" style={{ backgroundColor: 'var(--color-wedding-bg)' }}>
      <div className="container mx-auto px-6 max-w-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-xs font-serif mb-3" style={{ color: 'var(--color-wedding-illustration)' }}>
            Répondez s'il vous plaît
          </p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--color-wedding-accent)' }}>
            RSVP
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5 opacity-30">
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
            <span style={{ color: 'var(--color-wedding-gold)' }}>✦</span>
            <span className="block h-px w-12" style={{ backgroundColor: 'var(--color-wedding-gold)' }} />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative p-8 md:p-12"
          style={{
            background: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(154,142,120,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Corner accents */}
          {[['top-2.5 left-2.5', 'border-t border-l'], ['top-2.5 right-2.5', 'border-t border-r'], ['bottom-2.5 left-2.5', 'border-b border-l'], ['bottom-2.5 right-2.5', 'border-b border-r']].map(([pos, borders], i) => (
            <div key={i} className={`absolute ${pos} w-5 h-5 ${borders}`} style={{ borderColor: 'rgba(200,169,110,0.5)' }} />
          ))}

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-14 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="flex justify-center mb-6"
                >
                  <CheckCircle size={40} style={{ color: 'var(--color-wedding-accent)' }} strokeWidth={1.5} />
                </motion.div>
                <p className="font-script text-3xl mb-4" style={{ color: 'var(--color-wedding-accent)' }}>Merci !</p>
                <p className="font-serif text-lg italic mb-2" style={{ color: 'var(--color-wedding-illustration)' }}>
                  Votre réponse a bien été enregistrée.
                </p>
                <p className="uppercase tracking-[0.2em] text-[11px] md:text-xs font-serif" style={{ color: 'var(--color-wedding-illustration)' }}>
                  Nous avons hâte de célébrer avec vous.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-7 text-left"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="rsvp-name" className={labelClass} style={{ color: 'var(--color-wedding-illustration)' }}>Nom & Prénom</label>
                    <input
                      id="rsvp-name" name="name" required type="text"
                      value={formData.name} onChange={handleChange}
                      placeholder="Votre nom complet"
                      className={inputClass}
                      style={{ borderBottom: '1px solid rgba(154,142,120,0.35)', color: 'var(--color-wedding-accent)' }}
                      onFocus={e => e.target.style.borderBottomColor = 'var(--color-wedding-accent)'}
                      onBlur={e => e.target.style.borderBottomColor = 'rgba(154,142,120,0.35)'}
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-email" className={labelClass} style={{ color: 'var(--color-wedding-illustration)' }}>Email</label>
                    <input
                      id="rsvp-email" name="email" required type="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="votre@email.com"
                      className={inputClass}
                      style={{ borderBottom: '1px solid rgba(154,142,120,0.35)', color: 'var(--color-wedding-accent)' }}
                      onFocus={e => e.target.style.borderBottomColor = 'var(--color-wedding-accent)'}
                      onBlur={e => e.target.style.borderBottomColor = 'rgba(154,142,120,0.35)'}
                    />
                  </div>
                </div>

                {/* Presence */}
                <div>
                  <p className={labelClass} style={{ color: 'var(--color-wedding-illustration)' }}>Serez-vous présent(s) ?</p>
                  <div className="flex gap-8 mt-3">
                    {[{ value: 'oui', label: 'Oui, avec joie' }, { value: 'non', label: 'Non, avec regret' }].map(opt => (
                      <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio" name="presence" value={opt.value} required
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                          style={{
                            borderColor: formData.presence === opt.value ? 'var(--color-wedding-accent)' : 'rgba(154,142,120,0.4)',
                          }}
                        >
                          {formData.presence === opt.value && (
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-wedding-accent)' }} />
                          )}
                        </span>
                        <span
                          className="font-serif text-lg italic transition-colors duration-200"
                          style={{ color: formData.presence === opt.value ? 'var(--color-wedding-accent)' : 'var(--color-wedding-illustration)' }}
                        >
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="rsvp-guests" className={labelClass} style={{ color: 'var(--color-wedding-illustration)' }}>Nombre d'invités</label>
                  <select
                    id="rsvp-guests" name="guests"
                    value={formData.guests} onChange={handleChange}
                    className={inputClass + ' cursor-pointer'}
                    style={{ borderBottom: '1px solid rgba(154,142,120,0.35)', color: 'var(--color-wedding-accent)' }}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n} style={{ backgroundColor: 'var(--color-wedding-bg)' }}>
                        {n} {n === 1 ? 'personne' : 'personnes'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Allergies */}
                <div>
                  <label htmlFor="rsvp-allergies" className={labelClass} style={{ color: 'var(--color-wedding-illustration)' }}>Allergies / Régime alimentaire</label>
                  <textarea
                    id="rsvp-allergies" name="allergies" rows={2}
                    value={formData.allergies} onChange={handleChange}
                    placeholder="Précisez si nécessaire…"
                    className={inputClass + ' resize-none'}
                    style={{ borderBottom: '1px solid rgba(154,142,120,0.35)', color: 'var(--color-wedding-accent)' }}
                    onFocus={e => e.target.style.borderBottomColor = 'var(--color-wedding-accent)'}
                    onBlur={e => e.target.style.borderBottomColor = 'rgba(154,142,120,0.35)'}
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center gap-3 px-10 py-3.5 text-[11px] uppercase tracking-[0.22em] font-serif transition-all duration-400 disabled:opacity-50 group"
                    style={{ border: '1px solid var(--color-wedding-accent)', color: 'var(--color-wedding-accent)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-wedding-accent)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-wedding-bg)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-wedding-accent)';
                    }}
                  >
                    {status === 'submitting' ? (
                      <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>Envoi…</motion.span>
                    ) : (
                      <>
                        <Send size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Confirmer
                      </>
                    )}
                  </button>
                  <p className="mt-5 uppercase tracking-[0.2em] text-[9px] font-serif" style={{ color: 'var(--color-wedding-illustration)' }}>
                    Merci de répondre avant le 1er Août 2026
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center pt-12"
          style={{ borderTop: '1px solid rgba(154,142,120,0.2)' }}
        >
          <p className="uppercase tracking-[0.3em] text-[10px] font-serif mb-3" style={{ color: 'var(--color-wedding-illustration)' }}>
            Dress Code
          </p>
          <h3 className="font-script text-4xl mb-3" style={{ color: 'var(--color-wedding-accent)' }}>Tenue de soirée</h3>
          <p className="font-serif text-sm tracking-wide" style={{ color: 'var(--color-wedding-illustration)' }}>
            Tenue élégante ou traditionnelle marocaine
          </p>
        </motion.div>
      </div>
    </section>
  );
}
