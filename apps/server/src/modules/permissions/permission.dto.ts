import { RoleDto } from '../roles/roles.dto'
import { UserDto } from '../users/dto/user.dto'

export class PermissionDto {
  public name: string

  public userId: string

  public roleId: string

  public user: UserDto

  public role: RoleDto
}
