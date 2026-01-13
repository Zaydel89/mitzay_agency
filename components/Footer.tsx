
import React from 'react';
import { FOOTER_CONTENT } from '../constants';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onScrollToSection?: (index: number) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToSection }) => {
  return (
    <footer className="w-full glass p-10 md:p-12 rounded-[3rem] border border-primary/20 text-center relative overflow-hidden">
      <div className="relative z-10">
        <img src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" className="w-16 h-16 mx-auto mb-6" />
        <h4 className="font-poppins font-bold text-3xl mb-4">MitZay<span className="text-primary">.</span></h4>
        <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10">{FOOTER_CONTENT.microcopy}</p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {FOOTER_CONTENT.socials.map(s => (
            <a key={s.name} href={s.url} className="px-5 py-2 glass rounded-full text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">{s.name}</a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{FOOTER_CONTENT.legal}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
