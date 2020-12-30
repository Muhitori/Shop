import { SetMetadata } from '@nestjs/common'
import { RoleDto } from '../modules/roles/roles.dto'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: RoleDto[]) => SetMetadata(ROLES_KEY, roles)
