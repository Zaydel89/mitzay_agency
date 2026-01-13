
import { NavLink, Service, CaseStudy, Testimonial, DetailedService } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'INICIO', page: 'home' },
  { label: 'SERVICIOS', page: 'services' },
  { label: 'CURSOS GRATIS', page: 'courses' },
];

export const HOME_SECTIONS = [
  { label: 'Inicio', index: 0 },
  { label: 'Ecosistema', index: 1 },
  { label: 'Impacto Real', index: 2 },
  { label: 'Experiencias', index: 3 },
  { label: 'Agenda', index: 4 },
  { label: 'Nexus', index: 6 },
];

export const CALENDLY_URL = "https://calendar.app.google/cHUQDW3hy5a3BzcQ6";

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

export const CASE_STUDIES: CaseStudy[] = [
    {
        title: "E-commerce Moderno",
        description: "Automatización de atención al cliente y campañas de retargeting con IA.",
        kpis: ["+45% en Ventas", "+30% Retención", "-60% Tiempo Respuesta"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766460145/InShot_20251222_212113614_sje2id.mp4",
        alt: "Crecimiento e-commerce"
    },
    {
        title: "Startup SaaS",
        description: "Rediseño web enfocado en UX y creación de contenido de valor para blog.",
        kpis: ["+300% Tráfico Orgánico", "+70% Leads Calificados", "Top 3 en Google"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766461932/InShot_20251222_215114178_jykvrc.mp4",
        alt: "SaaS Dashboard"
    }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "El rediseño web y la estrategia de contenido transformaron nuestro alcance. Ahora, los clientes nos encuentran a nosotros.",
    highlight: "transformaron nuestro alcance",
    name: "Ana García",
    title: "Directora Marketing",
    image: "https://picsum.photos/200/200?random=1",
    date: "15/04/2024"
  },
  {
    quote: "La automatización de flujos nos ahorró incontables horas. El equipo de MitZay es profesional y rápido.",
    highlight: "nos ahorró incontables horas",
    name: "Carlos Rodriguez",
    title: "CEO Operations",
    image: "https://picsum.photos/200/200?random=2",
    date: "22/09/2024"
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
    intro: "Soluciones de marketing y automatización diseñadas para escalar sin aumentar carga operativa.",
    detailedServices: [
        {
            title: "Diseño y Desarrollo Web",
            objective: "Lanzar un sitio web profesional y optimizado.",
            deliverables: ["UI/UX a medida", "Responsive & Speed", "SEO Técnico"],
            time: "4-6 semanas"
        },
        {
            title: "Contenido con IA",
            objective: "Generar contenido de alta calidad con eficiencia.",
            deliverables: ["Calendario mensual", "Guiones IA", "Creativos"],
            time: "Mensual"
        }
    ] as DetailedService[]
};
