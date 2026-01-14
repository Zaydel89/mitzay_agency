
import { NavLink, Service, PortfolioItem, Testimonial, DetailedService } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'INICIO', page: 'home' },
  { label: 'SERVICIOS', page: 'services' },
  { label: 'CURSOS GRATIS', page: 'courses' },
];

export const HOME_SECTIONS = [
  { label: 'Inicio', index: 0 },
  { label: 'Ecosistema', index: 1 },
  { label: 'Portafolio', index: 2 },
  { label: 'Experiencias', index: 3 },
  { label: 'Agenda', index: 4 },
  { label: 'Nexus', index: 6 },
];

export const CALENDLY_URL = "https://calendar.app.google/cHUQDW3hy5a3BzcQ6";

export const DISCOUNT_CONFIG = {
  percentage: "25%",
  deadline: "31 de Enero, 2025 - 10:00 PM",
  code: "MITZAY25",
  ctaText: "¡25% OFF EN TODO EL ECOSISTEMA!",
  subText: "Regístrate antes del cierre para obtener tu código exclusivo."
};

export const HERO_CONTENT = {
  h1: "Convierte tu presencia digital en ingresos recurrentes con IA",
  subheadline: "Diseño web + IA + automatización que potencia tus ventas. Agenda una videollamada y recibe un plan personalizado para convertir tráfico en clientes reales.",
  cta: "RESUELVE TUS DUDAS",
};

export const CTA_VARIATIONS = [
    "RESUELVE TUS DUDAS",
    "OBTÉN TU PLAN DE ACCIÓN",
    "AGENDA TU CONSULTA GRATIS",
    "EMPIEZA A CRECER HOY",
    "QUIERO AUTOMATIZAR MI NEGOCIO"
];

export const SERVICES_OVERVIEW: Service[] = [
  {
    id: "diseno-web",
    title: "Diseño Web",
    description: "Creamos sitios que Convierten: Estructuras claras, Velocidad óptima y Experiencia móvil impecable.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540086/web_orc84m.mp4",
    alt: "Diseño Web Profesional MitZay",
    icon: "💻",
    features: ["Optimización SEO", "Diseño Adaptable", "Velocidad de Carga"]
  },
  {
    id: "contenido-ia",
    title: "Contenido con IA para redes",
    description: "Generamos contenido con IA: Captions con Intención, Reels Impactantes y Creativos. Alineamos tono y formato para maximizar Alcance.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/contenido_hlolyj.mp4",
    alt: "Contenido con IA MitZay",
    icon: "🤖",
    features: ["Guiones Persuasivos", "Copys Optimizados", "Estrategia Visual"]
  },
  {
    id: "redes-sociales",
    title: "Manejo de redes sociales",
    description: "Estrategia, Calendario y Ejecución: Publicaciones, Interacción y Campañas que Posicionan tu marca.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/redes_oaivhb.mp4",
    alt: "Manejo de Redes MitZay",
    icon: "📱",
    features: ["Gestión de Comunidad", "Análisis de Datos", "Crecimiento Orgánico"]
  },
  {
    id: "automatizacion-ia",
    title: "Automatización de flujos con IA",
    description: "Automatizamos Onboarding, Respuestas y Seguimiento para que tu equipo enfoque su tiempo en cerrar ventas.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/automatizacion_xra2z3.mp4",
    alt: "Automatización IA MitZay",
    icon: "⚙️",
    features: ["Onboarding Automático", "Lead Scoring", "Integraciones Smart"]
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "Stack PRO - Negocio Físico",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768350908/mecanico_avc0wn.mp4",
    alt: "Mecánico Portfolio",
    description: "Ecosistema digital de alto rendimiento diseñado para captar leads locales. Implementamos una interfaz intuitiva con carga ultra-rápida y formularios optimizados con Python, garantizando una experiencia de usuario sin fricciones. Desarrollado con Next.js y React para asegurar escalabilidad y una presencia profesional que genera confianza inmediata en el cliente."
  },
  {
    title: "Agencia Marketing Vanguardista",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346767/agencia_mitzay_veuelk.mp4",
    alt: "Agencia MitZay Portfolio",
    description: "Plataforma inmersiva con arquitectura de vanguardia que maximiza el impacto visual. Diseñada para convertir visitantes en leads cualificados mediante una narrativa fluida y estética disruptiva. La integración de Next.js permite una navegación instantánea, mientras que el backend robusto gestiona conversiones de alto volumen con total seguridad."
  },
  {
    title: "Landing Page Agencia IA",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346748/AGENCIA_IA_ptr05f.mp4",
    alt: "Agencia IA Portfolio",
    description: "Interfaz futurista y minimalista centrada en la autoridad de marca. Un sistema singular que educa y convence al usuario a través de una experiencia interactiva fluida. Optimizada para buscadores y escalabilidad técnica, utiliza un stack moderno de HTML5/CSS3 y React para proyectar una imagen de innovación tecnológica y solidez empresarial."
  },
  {
    title: "Sitio Web Barber Shop",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346743/BARBERIA_eaiw05.mp4",
    alt: "Barbería Portfolio",
    description: "Showcase premium con estética clásica y funcionalidad VIP. Estructura modular que monetiza cada sección, transmitiendo la experiencia del salón físico al entorno digital. Incluye analíticas avanzadas para medir el rendimiento de conversión, todo bajo una arquitectura responsiva que garantiza una visualización perfecta en cualquier dispositivo móvil."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Su proceso de automatización por WhatsApp es impecable. El trato fue muy profesional y ahora cerramos un 40% más de ventas sin esfuerzo manual.",
    highlight: "+40% en ventas cerradas",
    name: "Elena Torres",
    title: "Inmobiliaria Global",
    image: "https://i.pravatar.cc/150?u=elena",
    rating: 5,
  },
  {
    quote: "Diseñaron un sitio que transmite confianza total. Mi autoridad digital creció y pude duplicar mis honorarios en casos corporativos este trimestre.",
    highlight: "Duplicó facturación mensual",
    name: "Lic. Marcos Ruiz",
    title: "Consultor Legal",
    image: "https://i.pravatar.cc/150?u=marcos",
    rating: 5,
  },
  {
    quote: "Resolvieron el caos de reservas con IA. El servicio es fluido, el trato humano excelente y mis ingresos subieron un 25% al optimizar la ocupación.",
    highlight: "Crecimiento del 25% anual",
    name: "Chef Julián",
    title: "Restaurante Raíces",
    image: "https://i.pravatar.cc/150?u=julian",
    rating: 4.5,
  },
  {
    quote: "Su enfoque en conversión es real. Mi nueva landing filtra a los curiosos y me trae clientes listos para pagar mis mentorías de alto ticket.",
    highlight: "Filtro de leads de alta calidad",
    name: "Sofía Valls",
    title: "Business Coach",
    image: "https://i.pravatar.cc/150?u=sofia",
    rating: 5,
  },
  {
    quote: "Proceso ágil y diseño futurista. Gracias a la interfaz que crearon, cerramos nuestra primera ronda de inversión con éxito total frente a socios.",
    highlight: "Éxito en ronda de inversión",
    name: "Andrés P.",
    title: "SaaS Startup Tech",
    image: "https://i.pravatar.cc/150?u=andres",
    rating: 4.5,
  },
  {
    quote: "Atención de primera. Automatizaron mi agenda y recuperé 10 horas semanales mientras mis citas se triplicaron de forma totalmente orgánica.",
    highlight: "10 horas libres recuperadas",
    name: "Dra. Lucía Méndez",
    title: "Odontóloga Especialista",
    image: "https://i.pravatar.cc/150?u=lucia",
    rating: 5,
  },
  {
    quote: "La calidad del contenido con IA es superior. El engagement subió un 300% y nuestras ventas directas por Instagram se dispararon en un mes.",
    highlight: "+300% engagement en redes",
    name: "Roberto Díaz",
    title: "E-commerce Retail",
    image: "https://i.pravatar.cc/150?u=roberto",
    rating: 5,
  },
  {
    quote: "Me ayudaron a pasar de ser invisible a referente. Su estrategia web resolvió mi problema de posicionamiento y atrajo clientes VIP recurrentes.",
    highlight: "Captación de clientes VIP",
    name: "Valeria Sanz",
    title: "Consultora Estratégica",
    image: "https://i.pravatar.cc/150?u=valeria",
    rating: 4.5,
  }
];

export const CALENDLY_SECTION = {
    headline: "Sesión Estratégica: IA y Crecimiento Digital",
    copy: "En esta videollamada de 30 minutos, analizaremos los cuellos de botella de tu negocio y trazaremos una hoja de ruta personalizada."
};

export const FOOTER_CONTENT = {
    microcopy: "Diseño web, contenido con IA y automatizaciones. Hacemos que la tecnología trabaje para tu crecimiento.",
    contact: "¿Preguntas? Escríbenos o reserva una videollamada.",
    legal: `© ${new Date().getFullYear()} MitZay Agency. Todos los derechos reservados.`,
    socials: [
        { name: 'Instagram', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'YouTube', url: '#' },
        { name: 'TikTok', url: '#' },
    ]
};

export const SERVICES_PAGE_CONTENT = {
    title: "Servicios Integrales",
    intro: "Arquitectura digital de vanguardia. Soluciones escalables diseñadas para impactar y convertir mediante el uso avanzado de IA y estrategia humana de alto nivel.",
    detailedServices: [
        {
            title: "Desarrollo Web de Élite",
            objective: "Desplegar infraestructuras digitales de alta velocidad optimizadas para la conversión de tráfico cualificado.",
            deliverables: ["UI/UX High-End", "Optimización Core Web Vitals", "Arquitectura SEO Avanzada"],
        },
        {
            title: "Producción de Contenido con IA",
            objective: "Escalar la creación de activos digitales (video/audio/texto) con un estándar de calidad cinematográfico y coherencia de marca total.",
            deliverables: ["Scripts Persuasivos con IA", "Creativos de Alto Impacto", "Estrategia de Estilo Coherente"],
        },
        {
          title: "Agentes Potenciados con IA",
          objective: "Ecosistemas inteligentes que conectan tus bases de datos con agentes autónomos que asisten a tus usuarios de forma humana en WhatsApp y Telegram.",
          deliverables: ["Integración de Base de Conocimiento", "Respuestas de Voz y Texto Humano", "Flujos de Datos en Tiempo Real"],
        },
        {
          title: "Landing Pages de Impacto Emocional",
          objective: "Experiencias web inmersivas diseñadas para guiar al usuario fluidamente, optimizadas psicológicamente para disparar las ventas.",
          deliverables: ["Estructura Persuasiva Optimizada", "Diseño Orientado a la Acción", "Copywriting Psicológico"],
        },
        {
          title: "Campañas de Lanzamiento Explosivo",
          objective: "Generar picos masivos de ventas mediante historias de Instagram estructuradas con narrativa estratégica de alta conversión.",
          deliverables: ["Storytelling de Lanzamiento", "Embudo de Ventas en Stories", "Secuencia de Cierre Masivo"],
        },
        {
          title: "Crecimiento & Gestión de Comunidades",
          objective: "Construcción y escalado orgánico de audiencias desde cero, transformando tu marca en un referente de autoridad digital.",
          deliverables: ["Growth Hacking Orgánico", "Engagement Estratégico", "Construcción de Tribu Digital"],
        }
    ] as DetailedService[]
};
