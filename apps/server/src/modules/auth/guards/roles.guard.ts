import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'apps/server/src/decorators/roles.decorator'
import { RoleList } from '../../roles/roleList'
import { UsersService } from '../../users/users.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RoleList[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    const userRole: string = await this.usersService
      .getUserById(user.id)
      .then((user) => user.role.name)

    return requiredRoles.some((role) => userRole === role)
  }
}
