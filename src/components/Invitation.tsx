import React from 'react';
import { motion } from 'motion/react';

export default function Invitation() {
  return (
    <section id="invitation" className="py-32 relative bg-[url('/bg-invitation.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-wedding-bg/70 pointer-events-none"></div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
         {/* Could add botanical SVG here */}
      </div>
      
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-wedding-accent flex flex-col items-center"
        >
          <div className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "Arial, sans-serif" }}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          
          <div className="text-wedding-illustration my-8">❖</div>
          
          <div className="uppercase tracking-[0.2em] text-sm md:text-base leading-loose">
            Leila et Karim Benabdallah
            <div className="text-xs tracking-widest mt-6 lowercase small-caps">
              ont la joie de vous convier au mariage de leur fille
            </div>
          </div>

          <h2 className="font-script text-7xl md:text-8xl mt-12 mb-6">
            Selma
          </h2>
          
          <div className="font-serif text-2xl italic text-wedding-illustration my-2">
            avec
          </div>
          
          <h2 className="font-script text-7xl md:text-8xl mt-6 mb-12">
            Jamil Joundy
          </h2>

          <div className="text-wedding-illustration my-8">❖</div>

          <div className="uppercase tracking-[0.2em] text-[11px] md:text-xs leading-loose opacity-90">
            et seraient ravis de célébrer avec vous<br />
            cette heureuse union.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
