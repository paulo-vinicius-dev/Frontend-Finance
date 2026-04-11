import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { adminService } from '../services/admin.service'
import type { AdminUserUpdateRequest } from '../types/admin.types'

export const adminKeys = {
  all: ['admin', 'users'] as const,
  list: (params: object) => [...adminKeys.all, 'list', params] as const,
  detail: (id: string) => [...adminKeys.all, 'detail', id] as const,
}

export function useAdminUsers(params: {
  search?: string
  page?: number
  size?: number
  sort?: string
}) {
  return useQuery({
    queryKey: adminKeys.list(params),
    queryFn: () => adminService.listUsers(params),
    placeholderData: (prev) => prev,
  })
}

export function useAdminUpdateUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AdminUserUpdateRequest) => adminService.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
      toast.success('Usuário atualizado com sucesso')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erro ao atualizar usuário'
      toast.error(message)
    },
  })
}

export function useAdminDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all })
      toast.success('Usuário removido com sucesso')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Erro ao remover usuário'
      toast.error(message)
    },
  })
}
