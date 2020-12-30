import { RoleDto } from '../../roles/roles.dto'

export class RegisterUserDto {
  public email: string

  public username: string

  public password: string

  public birthDate: Date

  public countryName: string

  public role: RoleDto
}
