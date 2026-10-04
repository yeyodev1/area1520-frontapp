import type { AxiosProgressEvent } from 'axios'
import APIBase from './httpBase'
import type { AdminStats, Album, Lead, LeadStatus, Paginated, Photo, PhotoTag } from '@/types'

export interface LeadQuery {
  status?: LeadStatus | ''
  q?: string
  page?: number
  limit?: number
}

export interface LeadPatch {
  status?: LeadStatus
  notes?: string
}

export interface AlbumInput {
  title?: string
  eventName?: string
  eventDate?: string | null
  description?: string
  isPublished?: boolean
  order?: number
  coverPublicId?: string
}

export type PhotoFilter = 'all' | 'visible' | 'hidden' | 'tagged'

export interface PhotoPatch {
  isHidden?: boolean
  tags?: PhotoTag[]
  order?: number
}

/** Quita los parámetros vacíos para no mandar "?status=&q=" al API. */
function toQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value))
  }
  const text = search.toString()
  return text ? `?${text}` : ''
}

class AdminService extends APIBase {
  async stats(): Promise<AdminStats> {
    const { data } = await this.get<AdminStats>('admin/stats')
    return data
  }

  async leads(query: LeadQuery = {}): Promise<Paginated<Lead>> {
    const { data } = await this.get<Paginated<Lead>>(
      `admin/leads${toQuery({ status: query.status, q: query.q, page: query.page, limit: query.limit })}`,
    )
    return data
  }

  async updateLead(id: string, patch: LeadPatch): Promise<Lead> {
    const { data } = await this.patch<Lead>(`admin/leads/${id}`, patch)
    return data
  }

  async deleteLead(id: string): Promise<void> {
    await this.delete(`admin/leads/${id}`)
  }

  async albums(): Promise<Album[]> {
    const { data } = await this.get<Album[]>('admin/albums')
    return data
  }

  async createAlbum(input: AlbumInput): Promise<Album> {
    const { data } = await this.post<Album>('admin/albums', input)
    return data
  }

  async updateAlbum(id: string, patch: AlbumInput): Promise<Album> {
    const { data } = await this.patch<Album>(`admin/albums/${id}`, patch)
    return data
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.delete(`admin/albums/${id}`)
  }

  async albumPhotos(
    id: string,
    query: { page?: number; limit?: number; filter?: PhotoFilter } = {},
  ): Promise<Paginated<Photo>> {
    const { data } = await this.get<Paginated<Photo>>(`admin/albums/${id}/photos${toQuery(query)}`)
    return data
  }

  /** Sube un lote (máx. 20). La subida pasa por Cloudinary: se da más tiempo que al resto. */
  async uploadPhotos(
    id: string,
    files: File[],
    onProgress?: (percent: number) => void,
  ): Promise<Photo[]> {
    const form = new FormData()
    files.forEach((file) => form.append('files', file))
    const { data } = await this.post<Photo[]>(`admin/albums/${id}/photos`, form, undefined, {
      timeout: 5 * 60 * 1000,
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (onProgress && event.total) onProgress(Math.round((event.loaded / event.total) * 100))
      },
    })
    return data
  }

  async updatePhoto(id: string, patch: PhotoPatch): Promise<Photo> {
    const { data } = await this.patch<Photo>(`admin/photos/${id}`, patch)
    return data
  }

  async deletePhoto(id: string): Promise<void> {
    await this.delete(`admin/photos/${id}`)
  }
}

export const adminService = new AdminService()
