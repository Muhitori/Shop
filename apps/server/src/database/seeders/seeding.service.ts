import { Injectable, Logger } from '@nestjs/common'
import { CountriesService } from '../../modules/countries/countries.service'
import { CountryDto } from '../../modules/countries/country.dto'
import { PermissionDto } from '../../modules/permissions/permission.dto'
import { PermissionsService } from '../../modules/permissions/permissions.service'
import { PriceDto } from '../../modules/prices/price.dto'
import { PricesService } from '../../modules/prices/prices.service'
import { RoleDto } from '../../modules/roles/roles.dto'
import { RolesService } from '../../modules/roles/roles.service'
import { RegisterUserDto } from '../../modules/users/dto/registerUser.dto'
import { UsersService } from '../../modules/users/users.service'
import * as data from './data'

@Injectable()
export class SeedingService {
  constructor(
    private logger: Logger,
    private countriesService: CountriesService,
    private pricesService: PricesService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private permissionsService: PermissionsService
  ) {}

  async seed(): Promise<any> {
    data.initialCountries.forEach((country) => {
      this.countriesService.create(country as CountryDto).then((completed) => {
        this.logger.debug(country.name + 'seeded...')
      })
    })

    const country = await this.countriesService.getCountryByName('USA')

    const prices: PriceDto[] = data.initialPrices.map((price) => {
      return {
        ...price,
        countryId: country.id
      } as PriceDto
    })

    await this.pricesService.createMany(prices).then((completed) => {
      this.logger.debug('Prices seeded...')
    })

    const users: RegisterUserDto[] = data.initialUsers.map((user) => {
      return {
        ...user,
        countryName: country.name
      } as RegisterUserDto
    })

    await this.usersService.createMany(users).then((completed) => {
      this.logger.debug('Users seeded...')
    })

    data.initialRoles.forEach((role) => {
      this.rolesService.create(role as RoleDto).then((completed) => {
        this.logger.debug(role.name + 'seeded...')
      })
    })

    const user = await this.usersService.getUserByEmail(
      data.initialUsers[0].email
    )

    data.initialPermissions.forEach((permission) => {
      const newPermission: PermissionDto = {
        name: permission.name
      } as PermissionDto

      switch (permission.name) {
        case 'GODLY_PERMISSIONS':
          this.seedPermission(user.id, newPermission, 'Admin')
          break
        case 'SELLER_PERMISSIONS':
          this.seedPermission(user.id, newPermission, 'Seller')
          break
        case 'USER_PERMISSIONS':
          this.seedPermission(user.id, newPermission, 'User')
          break
        default:
          this.seedPermission(user.id, newPermission, 'Guest')
          break
      }
    })
  }

  async seedPermission(
    userId: string,
    permission: PermissionDto,
    roleName: string
  ) {
    const role = await this.rolesService.getRoleByName(roleName)
    permission.userId = userId
    permission.roleId = role.id
    await this.permissionsService.create(permission).then((completed) => {
      this.logger.debug(permission.name + 'seeded...')
    })
  }
}
