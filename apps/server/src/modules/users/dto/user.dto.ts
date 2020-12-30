import { CountryDto } from '../../countries/country.dto'
import { PermissionDto } from '../../permissions/permission.dto'
import { RoleDto } from '../../roles/roles.dto'

export class UserDto {
  public id: string

  public email: string

  public username: string

  public password: string

  public birthDate: Date

  public avatar: string

  public country: CountryDto

  public permissions: PermissionDto[]

  public roles: RoleDto[]
}
