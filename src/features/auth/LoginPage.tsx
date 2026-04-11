import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { loginSchema, type LoginFormValues } from './authSchemas'
import { useAuthStore } from '@/store/authStore'
import { apiClient } from '@/lib/axios'
import type { AuthResponse, UserResponse } from '@/types/api'
import { Button, Input, FormField } from '@/components/ui'
import AuthBackground from './AuthBackground'
import { useTheme } from '@/hooks/useTheme'

export default function LoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setTokens = useAuthStore((s) => s.setTokens)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const { isDark, toggle } = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      logout()
      queryClient.clear()

      const { data: auth } = await apiClient.post<AuthResponse>(
        '/api/v1/auth/login',
        values
      )
      setTokens(auth.accessToken, auth.refreshToken)

      const { data: user } = await apiClient.get<UserResponse>(
        '/api/v1/users/me'
      )
      setUser(user)
      queryClient.clear()

      navigate('/')
    } catch {
      toast.error('E-mail ou senha inválidos')
    }
  }

  return (
    <>
      <AuthBackground isDark={isDark} />

      {/* Theme toggle */}
      <button
        onClick={toggle}
        aria-label="Alternar tema"
        className={[
          'fixed top-4 right-4 z-50 rounded-full p-2.5 transition-colors',
          isDark
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-black/5 text-gray-700 hover:bg-black/10',
        ].join(' ')}
      >
        {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>

      <div className="min-h-dvh flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className={[
              'text-3xl font-bold text-center tracking-tight',
              isDark ? 'text-white' : 'text-gray-900',
            ].join(' ')}>
              Finance App
            </h1>
            <p className={[
              'mt-2 text-center text-sm',
              isDark ? 'text-blue-200/70' : 'text-gray-500',
            ].join(' ')}>
              Acesse sua conta
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={[
              'rounded-2xl px-8 py-10 space-y-6 shadow-2xl',
              isDark
                ? 'border border-white/10 bg-white/5 backdrop-blur-xl [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input]:placeholder:text-white/30 [&_label]:text-white/80'
                : 'border border-gray-200 bg-white [&_label]:text-gray-700',
            ].join(' ')}
            noValidate
          >
            <FormField label="E-mail" error={errors.email?.message} required>
              <Input
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                {...register('email')}
              />
            </FormField>
            <FormField label="Senha" error={errors.password?.message} required>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('password')}
              />
            </FormField>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className={[
            'text-center text-sm',
            isDark ? 'text-blue-200/60' : 'text-gray-500',
          ].join(' ')}>
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className={[
                'font-semibold transition-colors',
                isDark
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-500',
              ].join(' ')}
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
