import APIBase from './httpBase'
import type { Album, Paginated, Photo, PhotoTag } from '@/types'

class GalleryService extends APIBase {
  async albums(): Promise<Album[]> {
    const { data } = await this.get<Album[]>('albums')
    return data
  }

  async album(slug: string): Promise<Album> {
    const { data } = await this.get<Album>(`albums/${encodeURIComponent(slug)}`)
    return data
  }

  async albumPhotos(slug: string, page = 1, limit = 40): Promise<Paginated<Photo>> {
    const { data } = await this.get<Paginated<Photo>>(
      `albums/${encodeURIComponent(slug)}/photos?page=${page}&limit=${limit}`,
    )
    return data
  }

  async photosByTag(tag: PhotoTag, limit = 12, album?: string): Promise<Photo[]> {
    const params = new URLSearchParams({ tag, limit: String(limit) })
    if (album) params.set('album', album)
    const { data } = await this.get<Photo[]>(`photos?${params.toString()}`)
    return data
  }
}

export const galleryService = new GalleryService()
