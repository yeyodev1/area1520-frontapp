import type { LeadStatus, LocationSlug, PhotoTag } from '@/types'

/*
 * Textos del panel. Viven aquí y no en config/site.ts porque solo los ve el
 * dueño del box: site.ts queda para el copy público.
 */

export const leadStatuses: { value: LeadStatus; label: string; icon: string }[] = [
  { value: 'nuevo', label: 'Nuevo', icon: 'fa-solid fa-star' },
  { value: 'contactado', label: 'Contactado', icon: 'fa-solid fa-comment' },
  { value: 'agendado', label: 'Agendado', icon: 'fa-solid fa-calendar-check' },
  { value: 'inscrito', label: 'Inscrito', icon: 'fa-solid fa-dumbbell' },
  { value: 'descartado', label: 'Descartado', icon: 'fa-solid fa-ban' },
]

export const statusLabel = (status: LeadStatus) =>
  leadStatuses.find((s) => s.value === status)?.label ?? status

export const locationNames: Record<LocationSlug, string> = {
  garzota: 'Garzota',
  'la-joya': 'La Joya',
}

export const photoTags: { value: PhotoTag; label: string; help: string }[] = [
  { value: 'hero', label: 'Portada', help: 'Aparece en la portada de la home' },
  { value: 'featured', label: 'Destacada', help: 'Sale en las fotos destacadas de la home' },
  { value: 'community', label: 'Comunidad', help: 'Va en la sección de comunidad' },
  { value: 'podium', label: 'Podio', help: 'Se usa en la sección de podios de los Games' },
  { value: 'medals', label: 'Detalles', help: 'Medallas y detalles del evento' },
  { value: 'coach', label: 'Head coach', help: 'Foto del head coach en la sección del equipo' },
]

export const tagLabel = (tag: PhotoTag) => photoTags.find((t) => t.value === tag)?.label ?? tag

export const adminNav = [
  { name: 'AdminDashboard', match: ['AdminDashboard'], label: 'Panel', icon: 'fa-solid fa-gauge-high', badge: false },
  { name: 'AdminLeads', match: ['AdminLeads'], label: 'Interesados', icon: 'fa-solid fa-user-plus', badge: true },
  // El detalle de un álbum es ruta hermana, no hija: se marca a mano.
  { name: 'AdminAlbums', match: ['AdminAlbums', 'AdminAlbum'], label: 'Galería', icon: 'fa-solid fa-images', badge: false },
]

export const photoFilters = [
  { value: 'all', label: 'Todas' },
  { value: 'visible', label: 'Visibles' },
  { value: 'hidden', label: 'Ocultas' },
  { value: 'tagged', label: 'Con etiqueta' },
] as const
