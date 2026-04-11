import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/button'
import type { AdminUser, AdminUserUpdateRequest, Role } from '../types/admin.types'
import { useAdminUpdateUser } from '../queries/admin.queries'

type Props = {
  user: AdminUser | null
  open: boolean
  onClose: () => void
}

export function UserEditModal({ user, open, onClose }: Props) {
  const updateMutation = useAdminUpdateUser(user?.id ?? '')

  const { register, handleSubmit, reset, watch } = useForm<AdminUserUpdateRequest>({
    defaultValues: {
      isActive: true,
      roles: ['USER'],
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        isActive: user.isActive,
        roles: user.roles,
      })
    }
  }, [user, reset])

  const currentRoles = watch('roles')

  const toggleRole = (
    role: Role,
    currentRoles: Role[],
    onChange: (roles: Role[]) => void
  ) => {
    if (currentRoles.includes(role)) {
      // Keep at least one role
      if (currentRoles.length > 1) {
        onChange(currentRoles.filter((r) => r !== role))
      }
    } else {
      onChange([...currentRoles, role])
    }
  }

  const onSubmit = (values: AdminUserUpdateRequest) => {
    updateMutation.mutate(values, { onSuccess: onClose })
  }

  if (!user) return null

  return (
    <Modal open={open} onClose={onClose} title="Editar usuário" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Read-only info */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</p>
          <p className="text-sm text-gray-900 dark:text-white">{user.fullName}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</p>
          <p className="text-sm text-gray-900 dark:text-white">{user.email}</p>
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Conta ativa
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              {...register('isActive')}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full dark:bg-gray-700" />
          </label>
        </div>

        {/* Role selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Perfis</p>
          <div className="flex gap-3">
            {(['USER', 'ADMIN'] as Role[]).map((role) => {
              const checked = currentRoles?.includes(role) ?? false
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    toggleRole(role, currentRoles ?? [], (roles) =>
                      reset({ isActive: watch('isActive'), roles })
                    )
                  }
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ring-1 ring-inset transition-colors ${
                    checked
                      ? role === 'ADMIN'
                        ? 'bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20'
                        : 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20'
                      : 'bg-gray-50 text-gray-400 ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:ring-gray-600'
                  }`}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
