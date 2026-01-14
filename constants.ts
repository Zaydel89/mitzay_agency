
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
    description: "Diseñé este sitio pensando en que sea rápido, fácil de usar y que ayude al negocio a conseguir clientes. La estructura es simple y directa para que cualquiera encuentre la información sin perder tiempo. Está publicado en una plataforma estable y rápida, lo que garantiza buena velocidad en celular y escritorio. Lo trabajé como un sistema completo, no solo una página bonita: el diseño se adapta a cualquier pantalla, el contenido guía al visitante y los formularios son claros y seguros para que los clientes contacten sin problemas. También dejé todo listo para medir resultados y convertir visitas en oportunidades. Para construirlo usé herramientas modernas: Python para la lógica del servidor y el envío de formularios y correos; React para los elementos interactivos sin recargas; Next.js para que las páginas carguen rápido y sean amigables con buscadores; HTML5 para estructurar el contenido de forma accesible; y CSS3 para el diseño y la adaptación responsive."
  },
  {
    title: "Agencia Marketing Vanguardista",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346767/agencia_mitzay_veuelk.mp4",
    alt: "Agencia MitZay Portfolio",
    description: "Diseñé este sitio pensando en provocar el mayor impacto visual para captar la atención al primer vistazo, y con una estructura fuera de lo común que mantenga la atención y convierta visitantes en clientes. Está publicado en una plataforma estable y rápida, lo que garantiza buena velocidad en celular y escritorio. Lo trabajé como un sistema orgánico que presenta los servicios de la agencia de manera clara y atractiva, mientras que sirve como una pasarela que muestra la calidad del servicio. Responsivo a cualquier pantalla o dispositivos. Analytics para para medir resultados y convertir visitas en leads. Use Python para la lógica del servidor y el envío de formularios y correos; React para los elementos interactivos sin recargas; Next.js para que las páginas carguen rápido y sean amigables con buscadores; HTML5 para estructurar el contenido de forma accesible; y CSS3 para el diseño y la adaptación responsive."
  },
  {
    title: "Landing Page Agencia IA",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346748/AGENCIA_IA_ptr05f.mp4",
    alt: "Agencia IA Portfolio",
    description: "Este sitio fue pensando para dar una sensación minimalista y futurista, y con una estructura fluida que mantenga la atención y transmita la calidad que la agencia da en sus servicios. Está alojado en un repositorio de GitHub y desplegado en un Host estable y rápido, lo que garantiza buena velocidad en celular y escritorio. Lo trabajé como un sistema singular que da una reseña de los servicios de la empresa, al mismo tiempo que seduce y convence al usuario. Responsivo a cualquier pantalla o dispositivos. Analytics para para medir resultados y convertir visitas en leads. Use Python para la lógica del servidor y el envío de formularios y correos; React para los elementos interactivos sin recargas; Next.js para que las páginas carguen rápido y sean amigables con buscadores; HTML5 para estructurar el contenido de forma accesible; y CSS3 para el diseño y la adaptación responsive."
  },
  {
    title: "Sitio Web Barber Shop",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346743/BARBERIA_eaiw05.mp4",
    alt: "Barbería Portfolio",
    description: "Este sitio fue diseñado para servir de pasarela de trabajos realizados, de servicios ofrecidos y al mismo tiempo para transmitir una sensación y estilo de una Barberia Clásica, con una estructura que vende de manera orgánica optimizando sección por sección. Está alojado en un repositorio de GitHub y desplegado en un Host estable y rápido, lo que garantiza buena velocidad en celular y escritorio, al mismo tiempo lo hace escalable a modificaciones futuras. Lo trabajé como un sistema modular que da la sensación de estar físicamente en una Barber shop clásica y VIP. Responsivo a cualquier pantalla o dispositivos. Analytics para para medir resultados y convertir visitas en leads. Use Python para la lógica del servidor y el envío de formularios y correos; React para los elementos interactivos sin recargas; Next.js para que las páginas carguen rápido y sean amigables con buscadores; HTML5 para estructurar el contenido de forma accesible; y CSS3 para el diseño y la adaptación responsive."
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
