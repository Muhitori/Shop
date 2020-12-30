import { PermissionDto } from '../permissions/permission.dto'
import { UserDto } from '../users/dto/user.dto'

export class RoleDto {
  public id: string
  public name: string
  public users: UserDto[]

  public permissions: PermissionDto[]
}
