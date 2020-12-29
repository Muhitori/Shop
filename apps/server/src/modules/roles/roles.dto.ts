import { UserDto } from '../users/dto/user.dto'

export class RoleDto {
  public id: string
  public name: string
  public users: UserDto[]
}
