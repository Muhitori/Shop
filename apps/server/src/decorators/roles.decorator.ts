import { SetMetadata } from '@nestjs/common'
import { RoleList } from '../modules/roles/roleList'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: RoleList[]) => SetMetadata(ROLES_KEY, roles)
