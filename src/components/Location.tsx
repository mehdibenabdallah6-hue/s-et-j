import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function Location() {
  return (
    <section id="lieu" className="py-24 bg-white/40 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3 text-center md:text-left"
          >
            <h2 className="font-script text-5xl text-wedding-accent mb-6">Le Lieu</h2>
            <div className="font-serif text-wedding-accent space-y-4">
              <p className="uppercase tracking-[0.2em] text-sm font-medium">Réception</p>
              <p className="text-lg text-wedding-illustration">
                12 Rue des Marguerites<br/>
                Anfa, Casablanca<br/>
                Maroc
              </p>
              
              <div className="pt-6">
                <a 
                  href="https://maps.google.com/?q=12+Rue+des+Marguerites,+Anfa,+Casablanca" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-wedding-accent px-6 py-3 uppercase tracking-widest text-xs hover:bg-wedding-accent hover:text-wedding-bg transition-colors duration-300"
                >
                  <MapPin size={16} />
                  Ouvrir dans Maps
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-2/3 h-[400px] border border-wedding-illustration/30 p-2 bg-wedding-bg rounded-sm shadow-sm"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846430372076!2d-7.6570!3d33.5855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzA3LjgiTiA3wrAzOScyNS4yIlc!5e0!3m2!1sfr!2sma!4v1620000000000!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 mix-blend-multiply"
            ></iframe>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
