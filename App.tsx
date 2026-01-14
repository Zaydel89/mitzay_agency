
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Page, Service, PortfolioItem, Testimonial } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedSection from './components/AnimatedSection';
import NeuralNexusSection from './components/NeuralNexusSection';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import { 
  SERVICES_PAGE_CONTENT, 
  SERVICES_OVERVIEW, 
  PORTFOLIO_ITEMS, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL,
  DISCOUNT_CONFIG
} from './constants';

const BackgroundVideo: React.FC<{ fixed?: boolean }> = ({ fixed = false }) => (
  <div className={fixed ? "fixed inset-0 z-0" : "absolute inset-0 z-0"}>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 z-10"></div>
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-65 grayscale-[40%] brightness-90"
    >
      <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
    </video>
  </div>
);

const RegistrationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative glass w-full max-w-md p-8 rounded-[2.5rem] border border-primary/20 shadow-primary/20 shadow-2xl animate-scale-up">
        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
            <h3 className="text-2xl font-black text-center mb-2">ACTIVA TU DESCUENTO</h3>
            <p className="text-center text-gray-400 text-sm mb-6">Regístrate para recibir el código del 25% OFF válido hasta el {DISCOUNT_CONFIG.deadline.split(' - ')[0]}.</p>
            <div className="space-y-4">
              <input required type="text" placeholder="Nombre completo" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm" />
              <input required type="email" placeholder="Correo electrónico" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm" />
            </div>
            <button type="submit" className="w-full py-5 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] transition-transform">
              RECIBIR CÓDIGO
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/40">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="text-3xl font-black">¡ACTIVADO!</h3>
            <div className="p-6 bg-primary/10 border border-primary/30 rounded-2xl">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Tu código es:</p>
              <p className="text-4xl font-black text-white tracking-widest">{DISCOUNT_CONFIG.code}</p>
            </div>
            <p className="text-xs text-gray-400">Úsalo en tu próxima cotización antes del cierre de Enero.</p>
            <button onClick={onClose} className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline">Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
};

const DiscountCTA: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className = "" }) => (
  <div className={`mt-10 flex flex-col sm:flex-row items-center gap-6 ${className}`}>
    <div className="flex flex-col items-center sm:items-start">
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">OFERTA DE TEMPORADA</span>
      </div>
      <p className="text-white font-bold text-xs">{DISCOUNT_CONFIG.subText}</p>
    </div>
    <button 
      onClick={onClick}
      className="px-8 py-4 glass border border-primary/50 text-primary font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all group overflow-hidden relative"
    >
      <span className="relative z-10">OBTENER MI 25% DE DESCUENTO</span>
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
    </button>
  </div>
);

const VideoModal: React.FC<{ url: string; isOpen: boolean; onClose: () => void }> = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" 
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-6xl aspect-video glass rounded-[2rem] border border-primary/20 overflow-hidden shadow-2xl animate-scale-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:bg-primary hover:text-black transition-all group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <video 
          autoPlay 
          controls 
          className="w-full h-full object-contain bg-black"
        >
          <source src={url} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5 mt-1.5">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#374151" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
        return (
          <svg key={i} className="w-3.5 h-3.5 text-gray-700 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service; index: number; activeSection: number; onPlay: (url: string) => void }> = ({ service, index, activeSection, onPlay }) => {
  return (
    <AnimatedSection delay={index * 0.1} isActive={activeSection === 1} triggerOnSectionActive>
      <div className="glass p-6 rounded-3xl border border-primary/10 hover:border-primary/50 transition-all h-full group flex flex-col">
        <div 
          className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5 relative bg-black/50 cursor-pointer"
          onClick={() => onPlay(service.image)}
        >
          <video 
            loop 
            muted 
            autoPlay
            playsInline 
            className="w-full h-full object-cover transition-all duration-700 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
          >
            <source src={service.image} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
            <div className="w-14 h-14 glass border border-primary/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,220,1,0.3)] group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <h4 className="font-bold text-lg mb-3 text-primary uppercase tracking-tight">{service.title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed flex-1">{service.description}</p>
      </div>
    </AnimatedSection>
  );
};

const PortfolioCard: React.FC<{ item: PortfolioItem; index: number; activeSection: number; onPlay: (url: string) => void }> = ({ item, index, activeSection, onPlay }) => {
  return (
    <AnimatedSection delay={index * 0.15} isActive={activeSection === 2} triggerOnSectionActive>
      <div className="glass p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all flex flex-col h-full group">
        <div 
          className="w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5 relative bg-black/80 cursor-pointer"
          onClick={() => onPlay(item.video)}
        >
          <video 
            loop 
            muted 
            autoPlay
            playsInline 
            className="w-full h-full object-cover transition-all duration-1000 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100"
          >
            <source src={item.video} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 glass border border-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,220,1,0.2)]">
              <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <h4 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{item.title}</h4>
        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
          <p className="text-[11px] text-gray-400 leading-relaxed text-justify">{item.description}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalVideo, setModalVideo] = useState<{ url: string; isOpen: boolean }>({ url: '', isOpen: false });
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth < 768) return;
    
    const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    setScrollProgress(progress);
    const sectionIndex = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSection(sectionIndex);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768 || currentPage !== 'home') return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, currentPage]);

  const scrollToSection = (index: number) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  const openVideoModal = (url: string) => {
    setModalVideo({ url, isOpen: true });
  };

  const closeVideoModal = () => {
    setModalVideo({ url: '', isOpen: false });
  };

  const navigateToAgenda = () => {
    setCurrentPage('home');
    setTimeout(() => {
      scrollToSection(4);
    }, 150);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      {isLoading && <LoadingScreen />}
      
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onScrollToSection={scrollToSection}
      />

      <main className="md:pl-20 h-full">
        {currentPage === 'home' && (
          <div className="relative md:h-screen w-full md:overflow-hidden bg-black">
            <div 
              ref={scrollRef} 
              className="hidden md:flex md:flex-row md:h-screen md:overflow-x-auto md:overflow-y-hidden md:snap-x md:snap-mandatory no-scrollbar"
            >
              {/* SECTION 0: HERO */}
              <div className="horizontal-section flex flex-col items-center justify-center relative overflow-hidden">
                <BackgroundVideo />
                <Hero onScrollToAgenda={() => scrollToSection(4)} />
                <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="absolute bottom-20 z-30" />
              </div>

              {/* SECTION 1: ECOSISTEMA */}
              <div className="horizontal-section flex items-center px-10 md:px-20 relative overflow-hidden">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto relative z-20">
                  <AnimatedSection isActive={activeSection === 1} triggerOnSectionActive className="flex justify-between items-start mb-12">
                    <div>
                      <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Capacidades</h2>
                      <h3 className="text-4xl md:text-5xl font-poppins font-bold">Nuestro Ecosistema</h3>
                    </div>
                    <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="mt-0 hidden lg:flex" />
                  </AnimatedSection>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {SERVICES_OVERVIEW.map((s, i) => (
                      <ServiceCard key={s.id} service={s} index={i} activeSection={activeSection} onPlay={openVideoModal} />
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: PORTAFOLIO */}
              <div className="horizontal-section flex items-center px-10 md:px-20 relative overflow-hidden">
                <BackgroundVideo />
                <div className="w-full max-w-[90rem] mx-auto relative z-20">
                  <AnimatedSection isActive={activeSection === 2} triggerOnSectionActive className="flex justify-between items-end mb-12">
                    <div>
                      <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Muestra</h2>
                      <h3 className="text-4xl md:text-5xl font-poppins font-bold">Portafolio</h3>
                    </div>
                    <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="mt-0 hidden lg:flex" />
                  </AnimatedSection>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {PORTFOLIO_ITEMS.map((item, i) => (
                      <PortfolioCard key={i} item={item} index={i} activeSection={activeSection} onPlay={openVideoModal} />
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: TESTIMONIALS */}
              <div className="horizontal-section flex items-center px-10 md:px-20 relative overflow-hidden">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto relative z-20">
                  <header className="mb-12 flex justify-between items-end">
                    <div>
                      <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Experiencias</h2>
                      <h3 className="text-4xl md:text-5xl font-poppins font-bold">Lo que dicen de nosotros</h3>
                    </div>
                    <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="mt-0 hidden lg:flex" />
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                      <AnimatedSection key={i} delay={i * 0.1} isActive={activeSection === 3} triggerOnSectionActive>
                        <div className="glass p-6 rounded-3xl border border-white/5 h-full flex flex-col hover:border-primary/20 transition-colors">
                          <div className="flex items-center gap-4 mb-4">
                            <img src={t.image} className="w-10 h-10 rounded-full border border-primary/20 object-cover" alt={t.name} />
                            <div>
                              <p className="font-bold text-xs">{t.name}</p>
                              <p className="text-[9px] text-gray-500 uppercase tracking-widest">{t.title}</p>
                              <StarRating rating={t.rating} />
                            </div>
                          </div>
                          <p className="text-gray-300 text-[11px] italic flex-1 leading-relaxed">"{t.quote}"</p>
                          {t.highlight && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                              <span className="text-[9px] font-black text-primary uppercase tracking-widest">{t.highlight}</span>
                            </div>
                          )}
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 4: AGENDA */}
              <div className="horizontal-section flex items-center px-10 md:px-20 relative overflow-hidden">
                <BackgroundVideo />
                <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow z-20"></div>
                
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-20">
                  <AnimatedSection isActive={activeSection === 4} triggerOnSectionActive>
                    <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Let's talk</h2>
                    <h3 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-8">{CALENDLY_SECTION.headline}</h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">{CALENDLY_SECTION.copy}</p>
                    <div className="flex flex-col gap-6 items-start">
                      <a 
                        href={CALENDLY_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-5 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-primary/30 shadow-2xl hover:scale-105 hover:shadow-primary/50 transition-all active:scale-95"
                      >
                        Reservar ahora
                      </a>
                      <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="mt-4" />
                    </div>
                  </AnimatedSection>

                  <AnimatedSection delay={0.2} isActive={activeSection === 4} triggerOnSectionActive className="h-full flex items-center">
                    <div className="w-full aspect-[4/5] glass rounded-[2.5rem] border border-white/5 overflow-hidden relative group shadow-2xl transition-all duration-500 hover:border-primary/20 hover:scale-[1.02]">
                      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-[2.5rem] transition-colors pointer-events-none z-20"></div>
                      
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                         <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Cargando Agenda...</p>
                         </div>
                      </div>
                      <iframe 
                        src={CALENDLY_URL} 
                        className="w-full h-full relative z-10 border-0 invert-[0.92] hue-rotate-[145deg] brightness-90 saturate-50" 
                        scrolling="no"
                      ></iframe>
                    </div>
                  </AnimatedSection>
                </div>
              </div>

              {/* SECTION 5: FOOTER */}
              <div className="horizontal-section flex flex-col items-center justify-center px-10 md:px-20 relative overflow-hidden">
                <BackgroundVideo />
                <div className="relative z-20 w-full flex justify-center">
                  <Footer onNavigate={setCurrentPage} />
                </div>
              </div>

              {/* SECTION 6: NEXUS */}
              <div className="horizontal-section relative overflow-hidden flex flex-col items-center justify-center">
                <NeuralNexusSection />
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="fixed bottom-0 left-20 w-[calc(100%-5rem)] h-1 bg-white/5 z-[100]">
              <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="h-screen overflow-y-auto no-scrollbar relative">
            <BackgroundVideo fixed />
            <div className="relative z-20 py-32 px-6 md:px-10 max-w-6xl mx-auto">
              <header className="mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                  <span className="text-primary text-[9px] font-black tracking-[0.4em] uppercase">Elite Solutions</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-poppins font-bold text-white mb-8 tracking-tighter leading-none">
                  {SERVICES_PAGE_CONTENT.title}
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed font-light mb-12">
                  {SERVICES_PAGE_CONTENT.intro}
                </p>
                <DiscountCTA onClick={() => setIsDiscountOpen(true)} />
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                {SERVICES_PAGE_CONTENT.detailedServices.map((s, i) => (
                  <AnimatedSection 
                    key={i} 
                    delay={i * 0.05} 
                    className="glass p-10 rounded-[3rem] border border-white/5 group hover:border-primary/40 transition-all duration-700 relative flex flex-col h-full overflow-hidden"
                  >
                    {/* Background Highlight Effect */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
                    
                    <div className="relative z-10 flex-1">
                      <div className="inline-block p-4 rounded-3xl bg-primary/5 mb-8 border border-white/5 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500">
                        <svg className="w-8 h-8 text-primary opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      
                      <h3 className="text-3xl font-poppins font-bold mb-6 text-white group-hover:text-primary transition-all duration-500 tracking-tight leading-tight">
                        {s.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-10 leading-relaxed font-normal group-hover:text-gray-200 transition-colors">
                        {s.objective}
                      </p>
                      
                      <div className="space-y-4 pt-6 mb-10 border-t border-white/5">
                        {s.deliverables.map((d, j) => (
                          <div key={j} className="flex items-center gap-4 group/item">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/item:scale-150 transition-transform"></div>
                            <span className="text-[10px] text-primary/80 font-black uppercase tracking-[0.2em] group-hover/item:text-primary transition-colors">{d}</span>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={navigateToAgenda}
                        className="w-full py-4 glass border border-primary/20 text-primary font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all group-hover:border-primary/50"
                      >
                        Me interesa
                      </button>
                    </div>

                    {/* Decorative Bottom Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-1000"></div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'courses' && (
          <div className="h-screen flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
            <BackgroundVideo fixed />
            <div className="glass p-16 rounded-[4rem] border border-primary/20 max-w-2xl relative z-20">
              <h1 className="text-5xl font-bold mb-8">Cursos Gratis <span className="text-primary">—</span> Próximamente</h1>
              <p className="text-gray-400 mb-8">Estamos terminando de pulir nuestra academia IA. Deja tu correo para acceso prioritario.</p>
              <div className="flex gap-4 mb-10">
                <input type="email" placeholder="tu@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                <button className="bg-primary text-black font-black px-10 py-4 rounded-2xl uppercase tracking-widest text-xs">Unirme</button>
              </div>
              <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="justify-center" />
            </div>
          </div>
        )}
      </main>

      <VideoModal 
        url={modalVideo.url} 
        isOpen={modalVideo.isOpen} 
        onClose={closeVideoModal} 
      />
      
      <RegistrationModal 
        isOpen={isDiscountOpen} 
        onClose={() => setIsDiscountOpen(false)} 
      />

      <WhatsAppButton />
      <ChatBot />
    </div>
  );
};

export default App;
