import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-wedding-accent text-wedding-bg py-20 text-center relative border-t border-wedding-illustration/30">
      {/* Top decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-wedding-bg rotate-45 border border-wedding-illustration/30 flex items-center justify-center">
        <div className="w-4 h-4 border border-wedding-illustration/30"></div>
      </div>

      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="font-script text-5xl mb-8">Selma & Jamil</h2>
        
        <div className="font-serif uppercase tracking-[0.2em] text-xs space-y-4 mb-16 opacity-80">
          <p>Le 12 Septembre 2026</p>
          <p>Anfa, Casablanca</p>
        </div>

        <div className="font-serif italic text-lg opacity-90 mb-12">
          "Deux âmes, un seul chemin."
        </div>

        <div className="font-serif uppercase tracking-widest text-[10px] opacity-60">
          <p className="mb-2">Pour toute question, veuillez contacter :</p>
          <a href="mailto:contact@selma-jamil-mariage.ma" className="hover:opacity-100 transition-opacity">
            contact@selma-jamil-mariage.ma
          </a>
        </div>
      </div>
    </footer>
  );
}
