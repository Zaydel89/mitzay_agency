
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Page } from './types';
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
  CASE_STUDIES, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL 
} from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
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
      if (window.innerWidth < 768) return;
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
  }, [handleScroll]);

  const scrollToSection = (index: number) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      {isLoading && <LoadingScreen />}
      
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onScrollToSection={scrollToSection}
      />

      <main className="md:pl-20">
        {currentPage === 'home' && (
          <div className="relative md:h-screen w-full md:overflow-hidden bg-black">
            <div 
              ref={scrollRef} 
              className="hidden md:flex md:flex-row md:h-screen md:overflow-x-auto md:overflow-y-hidden md:snap-x md:snap-mandatory no-scrollbar"
            >
              {/* SECTION 0: HERO */}
              <div className="horizontal-section flex items-center justify-center">
                <Hero onScrollToAgenda={() => scrollToSection(4)} />
              </div>

              {/* SECTION 1: ECOSISTEMA */}
              <div className="horizontal-section bg-black flex items-center px-20 relative overflow-hidden">
                <div className="w-full max-w-7xl mx-auto">
                  <AnimatedSection isActive={activeSection === 1} triggerOnSectionActive>
                    <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Capacidades</h2>
                    <h3 className="text-4xl md:text-5xl font-poppins font-bold mb-12">Nuestro Ecosistema</h3>
                  </AnimatedSection>
                  <div className="grid grid-cols-4 gap-6">
                    {SERVICES_OVERVIEW.map((s, i) => (
                      <AnimatedSection key={i} delay={i * 0.1} isActive={activeSection === 1} triggerOnSectionActive>
                        <div className="glass p-8 rounded-3xl border border-primary/10 hover:border-primary/50 transition-all h-full">
                          <span className="text-4xl mb-6 block">{s.icon}</span>
                          <h4 className="font-bold text-lg mb-4 text-primary">{s.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.description}</p>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: IMPACTO */}
              <div className="horizontal-section bg-black flex items-center px-20">
                <div className="w-full max-w-5xl mx-auto">
                  <AnimatedSection isActive={activeSection === 2} triggerOnSectionActive>
                    <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Resultados</h2>
                    <h3 className="text-4xl md:text-5xl font-poppins font-bold mb-12">Impacto Real</h3>
                  </AnimatedSection>
                  <div className="grid grid-cols-2 gap-10">
                    {CASE_STUDIES.map((c, i) => (
                      <AnimatedSection key={i} delay={i * 0.2} isActive={activeSection === 2} triggerOnSectionActive>
                        <div className="glass p-10 rounded-3xl border border-white/5 group hover:border-primary/30 transition-all">
                          <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all">
                              <source src={c.image} type="video/mp4" />
                            </video>
                          </div>
                          <h4 className="text-xl font-bold mb-4">{c.title}</h4>
                          <div className="space-y-2">
                            {c.kpis.map((k, j) => <p key={j} className="text-primary font-bold text-xs uppercase tracking-widest">• {k}</p>)}
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: TESTIMONIALS */}
              <div className="horizontal-section bg-black flex items-center px-20">
                <div className="w-full max-w-7xl mx-auto">
                  <header className="mb-12">
                    <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Experiencias</h2>
                    <h3 className="text-4xl md:text-5xl font-poppins font-bold">Lo que dicen de nosotros</h3>
                  </header>
                  <div className="grid grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                      <AnimatedSection key={i} delay={i * 0.15} isActive={activeSection === 3} triggerOnSectionActive>
                        <div className="glass p-8 rounded-3xl border border-white/5 h-full flex flex-col">
                          <div className="flex items-center gap-4 mb-6">
                            <img src={t.image} className="w-12 h-12 rounded-full border border-primary/20" />
                            <div>
                              <p className="font-bold text-sm">{t.name}</p>
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t.title}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm italic flex-1 leading-relaxed">"{t.quote}"</p>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 4: AGENDA */}
              <div className="horizontal-section bg-black flex items-center px-20">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">
                  <div>
                    <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Let's talk</h2>
                    <h3 className="text-4xl md:text-6xl font-poppins font-bold leading-tight mb-8">{CALENDLY_SECTION.headline}</h3>
                    <p className="text-gray-400 text-lg mb-12">{CALENDLY_SECTION.copy}</p>
                    <a href={CALENDLY_URL} target="_blank" className="inline-block px-10 py-5 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-primary/30 shadow-2xl hover:scale-105 transition-all">Reservar ahora</a>
                  </div>
                  <div className="aspect-[4/5] glass rounded-3xl border border-primary/20 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                       <p className="text-primary font-black uppercase tracking-[0.2em] animate-pulse">Cargando Calendario...</p>
                    </div>
                    <iframe src={CALENDLY_URL} className="w-full h-full relative z-10 border-0 invert-[0.9] hue-rotate-[145deg]" scrolling="no"></iframe>
                  </div>
                </div>
              </div>

              {/* SECTION 5: FOOTER */}
              <div className="horizontal-section flex items-center justify-center px-20">
                <Footer onNavigate={setCurrentPage} />
              </div>

              {/* SECTION 6: NEXUS */}
              <NeuralNexusSection />
            </div>

            {/* PROGRESS BAR */}
            <div className="fixed bottom-0 left-20 w-[calc(100%-5rem)] h-1 bg-white/5 z-[100]">
              <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="min-h-screen py-32 px-10 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-12">{SERVICES_PAGE_CONTENT.title}</h1>
            <p className="text-xl text-gray-400 mb-20 max-w-3xl">{SERVICES_PAGE_CONTENT.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES_PAGE_CONTENT.detailedServices.map((s, i) => (
                <div key={i} className="glass p-10 rounded-3xl border border-white/5">
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-gray-400 text-sm mb-8">{s.objective}</p>
                  <ul className="space-y-3 mb-8">
                    {s.deliverables.map((d, j) => <li key={j} className="text-xs text-primary font-bold uppercase tracking-widest">✓ {d}</li>)}
                  </ul>
                  <div className="pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">Tiempo estimado: {s.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'courses' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
            <div className="glass p-16 rounded-[4rem] border border-primary/20 max-w-2xl">
              <h1 className="text-5xl font-bold mb-8">Cursos Gratis <span className="text-primary">—</span> Próximamente</h1>
              <p className="text-gray-400 mb-12">Estamos terminando de pulir nuestra academia IA. Deja tu correo para acceso prioritario.</p>
              <div className="flex gap-4">
                <input type="email" placeholder="tu@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                <button className="bg-primary text-black font-black px-10 py-4 rounded-2xl uppercase tracking-widest text-xs">Unirme</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <WhatsAppButton />
      <ChatBot />
    </div>
  );
};

export default App;
