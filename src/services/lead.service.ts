import APIBase from './httpBase'
import type { Lead, LeadInput } from '@/types'

class LeadService extends APIBase {
  async create(input: LeadInput): Promise<Lead> {
    const { data } = await this.post<Lead>('leads', input)
    return data
  }
}

export const leadService = new LeadService()
