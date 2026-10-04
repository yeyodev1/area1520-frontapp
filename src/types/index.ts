/** Forma con la que httpBase rechaza cualquier error del API. */
export interface ApiError {
  status: number
  message: string
  data?: unknown
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pages: number
}

/** Lo que devuelve el backapp en /auth/login y /auth/me. */
export interface SessionUser {
  id: string
  email: string
  name: string
  phone: string
  accountType: 'customer' | 'admin' | string
}

export type PhotoTag = 'hero' | 'featured' | 'community' | 'podium' | 'medals' | 'coach'

/** Foto de una galería. La URL de entrega se arma con utils/cloudinary a partir de publicId. */
export interface Photo {
  _id: string
  album: string
  publicId: string
  url: string
  width: number
  height: number
  originalName: string
  order: number
  tags: PhotoTag[]
  isHidden: boolean
}

export interface Album {
  _id: string
  slug: string
  title: string
  eventName: string
  eventDate: string | null
  description: string
  coverPublicId: string
  photographer: string
  photographerUrl: string
  order: number
  isPublished: boolean
  photoCount: number
  /** Solo en el admin: incluye las ocultas. */
  hiddenCount?: number
}

export type LeadStatus = 'nuevo' | 'contactado' | 'agendado' | 'inscrito' | 'descartado'
export type LocationSlug = 'garzota' | 'la-joya'

export interface LeadInput {
  name: string
  phone: string
  email?: string
  location: LocationSlug
  preferredSchedule?: string
  goal?: string
  experience?: string
  /** Honeypot: los humanos lo dejan vacío. */
  website?: string
}

export interface Lead extends Required<Omit<LeadInput, 'website'>> {
  _id: string
  source: string
  status: LeadStatus
  notes: string
  createdAt: string
  updatedAt: string
}

export interface AdminStats {
  leads: { total: number; nuevo: number; last7Days: number }
  photos: { total: number; hidden: number }
  albums: number
}
