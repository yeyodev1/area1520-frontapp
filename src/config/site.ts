/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan.
 *
 * Fuentes: Instagram @area1520crossfit y @calger87, linktr.ee/area1520 y la
 * galería oficial de AREA Games 2026 (Hafana Hafana).
 */
export const site = {
  name: 'AREA1520 CrossFit',
  shortName: 'AREA1520',
  tagline: 'Entrena como en casa.',
  description:
    'Box afiliado a CrossFit en Guayaquil desde 2014. Dos sedes, una sola familia: Garzota y La Joya.',
  url: 'https://area1520.bakano.ec',
  email: 'hola@area1520.bakano.ec',
  // Solo dígitos con código de país
  whatsapp: '593969514407',
  // El cloud name de Cloudinary es público (va en cada URL de imagen).
  cloudinaryCloud: 'hkw8wyov',
  social: {
    instagram: 'https://www.instagram.com/area1520crossfit/',
    facebook: 'https://www.facebook.com/profile.php?id=100054636092351',
    linktree: 'https://linktr.ee/area1520',
    tiktok: '',
  },
  nav: [
    { label: 'El box', to: '/#box' },
    { label: 'Programas', to: '/#programas' },
    { label: 'Sedes y horarios', to: '/#sedes' },
    { label: 'AREA Games', to: '/area-games-2026' },
    { label: 'Galería', to: '/galeria' },
  ],
  cta: { label: 'Primer día gratis', to: '/primer-dia-gratis' },

  hero: {
    eyebrow: 'CrossFit Affiliate · Guayaquil · Desde 2014',
    title: ['Entrena', 'como en', 'casa'],
    lead:
      'Un box donde te llaman por tu nombre, te corrigen la técnica y te esperan para el último burpee. Ven a probar: el primer día corre por nuestra cuenta.',
    primary: 'Reserva tu primer día gratis',
    secondary: 'Escríbenos por WhatsApp',
  },

  ticker: [
    'CrossFit Affiliate',
    'Desde 2014',
    'Sede Garzota',
    'Sede La Joya',
    '+6.000 en la comunidad',
    'AREA Games VI edición',
    'Primer día gratis',
  ],

  stats: [
    { value: '2014', label: 'Abrimos el box' },
    { value: '2', label: 'Sedes en Guayaquil' },
    { value: '17', label: 'Clases al día en La Joya' },
    { value: '6K+', label: 'Comunidad en Instagram' },
  ],

  box: {
    eyebrow: 'El box',
    title: 'No es un gimnasio. Es tu segunda casa.',
    paragraphs: [
      'AREA1520 nació en 2014 con una idea simple: que entrenar fuerte no tiene por qué sentirse frío. Aquí nadie entrena solo. Cada clase tiene un coach que te conoce, un plan que se adapta a tu nivel y una comunidad que grita tu nombre cuando más te cuesta.',
      'Somos box afiliado oficial a CrossFit. Eso significa metodología probada, coaches certificados y una forma de trabajar donde la técnica va primero y la intensidad viene después.',
    ],
    pillars: [
      {
        icon: 'fa-solid fa-user-check',
        title: 'Coaching de verdad',
        text: 'Grupos guiados de principio a fin. Escalamos cada movimiento a tu nivel, sin importar si vienes por primera vez.',
      },
      {
        icon: 'fa-solid fa-people-group',
        title: 'Comunidad',
        text: 'Beach WODs, Urban Fest, Blue Days, Navidad y los AREA Games. Aquí se entrena y se celebra en equipo.',
      },
      {
        icon: 'fa-solid fa-chart-line',
        title: 'Progreso medible',
        text: 'Trabajamos fuerza, gimnásticos y acondicionamiento con una programación que puedes medir semana a semana.',
      },
    ],
  },

  programs: {
    eyebrow: 'Programas',
    title: 'Elige cómo empezar',
    items: [
      {
        slug: 'crossfit',
        name: 'CrossFit',
        tag: 'Clase grupal',
        text: 'El WOD del día con calentamiento, técnica y entrenamiento. Fuerza, halterofilia, gimnásticos y cardio en 60 minutos.',
        points: ['Todos los niveles', 'Coach en cada clase', 'Escalado individual'],
      },
      {
        slug: 'training',
        name: 'Training',
        tag: 'Acondicionamiento',
        text: 'Para quien quiere ponerse en forma sin barra olímpica de por medio: fuerza funcional, resistencia y movilidad.',
        points: ['Ideal para empezar', 'Bajo impacto', 'Resultados desde el primer mes'],
      },
      {
        slug: 'kids',
        name: 'AREA Kids',
        tag: 'Vacacional',
        text: 'Movimiento, juego y disciplina para los más pequeños durante las vacaciones, con coaches dedicados.',
        points: ['Temporada vacacional', 'Grupos por edad', 'Ambiente seguro'],
      },
      {
        slug: 'eventos',
        name: 'Eventos',
        tag: 'Comunidad',
        text: 'Competencias internas, Beach WOD, Urban Fest y los AREA Games: la excusa perfecta para ponerte a prueba.',
        points: ['AREA Games', 'Beach WOD', 'Urban Fest'],
      },
    ],
  },

  coach: {
    eyebrow: 'Head Coach',
    name: 'Cristóbal Germán',
    handle: '@calger87',
    instagram: 'https://www.instagram.com/calger87/',
    title: 'Al frente del box desde 2014',
    text: 'Cristóbal fundó AREA1520 y sigue en el piso de entrenamiento todos los días. Coach CrossFit Level 2 y atleta máster en competencia: entrena lo que enseña.',
    credentials: [
      { icon: 'fa-solid fa-certificate', label: 'CrossFit Level 2 Trainer' },
      { icon: 'fa-solid fa-medal', label: 'Plata · Panamerican Master 2026' },
      { icon: 'fa-solid fa-trophy', label: 'Oro · South Fit Challenge, Guatemala 2015' },
      { icon: 'fa-solid fa-medal', label: 'Plata · Unbroken Games Equipos, Colombia 2016' },
    ],
  },

  locations: {
    eyebrow: 'Sedes y horarios',
    title: 'Dos sedes, una sola familia',
    items: [
      {
        slug: 'la-joya',
        name: 'Sede La Joya',
        badge: 'Nueva sede',
        area: 'La Joya, vía a Daule',
        address: '',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=AREA1520+CrossFit+La+Joya',
        schedule: [
          { days: 'Lunes a viernes · mañana', hours: ['05:00', '06:00', '07:00', '08:00', '09:00'] },
          {
            days: 'Lunes a viernes · tarde y noche',
            hours: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
          },
          { days: 'Viernes · extra', hours: ['18:30', '19:30', '20:30', '21:30'] },
          { days: 'Sábados', hours: ['08:00', '09:00'] },
        ],
      },
      {
        slug: 'garzota',
        name: 'Sede Garzota',
        badge: 'Sede original',
        area: 'La Garzota, norte de Guayaquil',
        address: '',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=AREA1520+CrossFit+Garzota+Guayaquil',
        // Horario por confirmar con el box: se muestra el aviso de WhatsApp.
        schedule: [] as { days: string; hours: string[] }[],
      },
    ],
    scheduleNote: 'Cada clase dura 60 minutos. Llega 10 minutos antes en tu primer día.',
    noSchedule: 'Escríbenos y te pasamos los horarios de esta sede.',
  },

  games: {
    eyebrow: 'AREA Games 2026 · VI edición',
    title: 'Garzota vs La Joya',
    date: '12 de septiembre de 2026',
    text: 'Dos sedes, un solo piso de competencia. La sexta edición de los AREA Games reunió a atletas de todos los niveles, heats de principiantes a RX y un público que no dejó de gritar ni un minuto.',
    cta: 'Ver las fotos del evento',
    credit: 'Fotografía: Hafana Hafana',
    creditUrl: 'https://hafanahafana.pixieset.com/area1520games2026/',
    highlights: [
      { value: 'VI', label: 'Edición' },
      { value: '1.141', label: 'Fotos del evento' },
      { value: '2', label: 'Sedes en competencia' },
    ],
  },

  community: {
    eyebrow: 'Comunidad',
    title: 'Aquí nadie termina el WOD solo',
    text: 'Lo que nos hace distintos no se ve en la pizarra: se ve en el último minuto, cuando todo el box está contigo.',
  },

  faq: {
    eyebrow: 'Preguntas',
    title: 'Antes de tu primera clase',
    items: [
      {
        q: '¿Necesito experiencia para empezar?',
        a: 'No. Cada movimiento se escala a tu nivel y el coach te acompaña durante toda la clase. La mayoría de nuestros atletas empezó sin haber hecho CrossFit nunca.',
      },
      {
        q: '¿Cómo funciona el primer día gratis?',
        a: 'Llenas el formulario o nos escribes por WhatsApp, eliges sede y horario, y te reservamos un cupo. Solo llega con ropa cómoda, agua y ganas.',
      },
      {
        q: '¿Qué llevo a mi primera clase?',
        a: 'Ropa deportiva, zapatos de entrenamiento, una toalla y tu botella de agua. El equipo lo ponemos nosotros.',
      },
      {
        q: '¿Cuánto cuesta la mensualidad?',
        a: 'Tenemos planes según la frecuencia con la que quieras entrenar. Escríbenos por WhatsApp y te enviamos los valores vigentes de cada sede.',
      },
      {
        q: '¿Puedo entrenar en las dos sedes?',
        a: 'Pregúntanos por tu plan: te contamos cómo combinar Garzota y La Joya según tus horarios.',
      },
    ],
  },

  lead: {
    eyebrow: 'Primer día gratis',
    title: 'Tu primera clase va por nuestra cuenta',
    text: 'Déjanos tus datos y te escribimos para confirmar tu cupo. Si prefieres, al enviar se abre WhatsApp con tu mensaje listo.',
    goals: [
      'Ponerme en forma',
      'Bajar de peso',
      'Ganar fuerza',
      'Competir',
      'Volver a entrenar',
      'Otro',
    ],
    experience: ['Nunca he entrenado', 'Entreno en gimnasio', 'Ya hice CrossFit'],
    success: '¡Listo! Te escribimos pronto para confirmar tu cupo.',
  },

  footer: {
    text: 'Box afiliado a CrossFit en Guayaquil. Entrena como en casa.',
    legal: 'CrossFit es una marca registrada de CrossFit, LLC.',
  },
} as const

export type LocationSlug = (typeof site.locations.items)[number]['slug']

export function whatsappLink(message = 'Hola! Quiero ser parte del team! Me gustaría más información. Mi nombre es...'): string {
  if (!site.whatsapp) return '#'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export const firstDayMessage =
  'Hola! Te escribo para registrarme por mi primer día *GRATUITO* en el box!! Mi nombre es...'
