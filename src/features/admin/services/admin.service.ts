import { api } from '@/lib/axios'
import type { AdminUser, AdminUserUpdateRequest, SpringPage } from '../types/admin.types'

class AdminService {
  private readonly base = '/api/v1/admin/users'

  async listUsers(params?: {
    search?: string
    page?: number
    size?: number
    sort?: string
  }): Promise<SpringPage<AdminUser>> {
    const { data } = await api.get<SpringPage<AdminUser>>(this.base, { params })
    return data
  }

  async getUserById(id: string): Promise<AdminUser> {
    const { data } = await api.get<AdminUser>(`${this.base}/${id}`)
    return data
  }

  async updateUser(id: string, payload: AdminUserUpdateRequest): Promise<AdminUser> {
    const { data } = await api.patch<AdminUser>(`${this.base}/${id}`, payload)
    return data
  }

  async deleteUser(id: string): Promise<void> {
    await api.delete(`${this.base}/${id}`)
  }
}

export const adminService = new AdminService()
