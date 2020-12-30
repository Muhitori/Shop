import { RoleDto } from '../../roles/roles.dto'

export class AuthUserDto {
  public id: string
  public email: string

  public username: string

  public password: string

  public role: RoleDto
}
