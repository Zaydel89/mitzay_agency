
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
    <section className="relative w-full h-full flex items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 z-10"></div>
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 grayscale brightness-75">
        <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">NUCLEO IA ACTIVO</span>
        </div>
        
        <h1 className="font-poppins text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-8">
          {HERO_CONTENT.h1}
        </h1>
        
        <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
          {HERO_CONTENT.subheadline}
        </p>

        <button
          onClick={onScrollToAgenda}
          className="h-16 px-12 bg-primary text-black font-black rounded-2xl text-sm shadow-[0_15px_30px_rgba(0,220,1,0.25)] hover:scale-105 transition-all uppercase tracking-widest"
        >
          {CTA_VARIATIONS[ctaIndex]}
        </button>
      </div>
    </section>
  );
};

export default Hero;
