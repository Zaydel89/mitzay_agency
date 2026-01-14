
import React, { useState, useEffect } from 'react';
import { HERO_CONTENT, CTA_VARIATIONS } from '../constants';

interface HeroProps {
  onScrollToAgenda?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToAgenda }) => {
  const [ctaIndex, setCtaIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCtaIndex(prev => (prev + 1) % CTA_VARIATIONS.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-full flex items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
      <div className="relative z-20 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-primary">NUCLEO IA ACTIVO</span>
        </div>
        
        <h1 className="font-poppins text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8">
          {HERO_CONTENT.h1}
        </h1>
        
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed">
          {HERO_CONTENT.subheadline}
        </p>

        <button
          onClick={onScrollToAgenda}
          className="h-12 sm:h-14 px-8 sm:px-10 bg-primary text-black font-black rounded-xl text-[10px] sm:text-xs shadow-[0_10px_20px_rgba(0,220,1,0.2)] hover:scale-105 transition-all uppercase tracking-widest active:scale-95"
        >
          {CTA_VARIATIONS[ctaIndex]}
        </button>
      </div>
    </section>
  );
};

export default Hero;
