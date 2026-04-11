export type Role = 'ADMIN' | 'USER'

export interface AdminUser {
  id: string
  fullName: string
  email: string
  roles: Role[]
  isActive: boolean
}

export interface AdminUserUpdateRequest {
  isActive: boolean
  roles: Role[]
}

/** Shape returned by Spring Data's Page<T> */
export interface SpringPage<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number   // 0-based
  size: number
  first: boolean
  last: boolean
  empty: boolean
}
