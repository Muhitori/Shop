import { Logger, Module } from '@nestjs/common'
import { CountriesModule } from '../../modules/countries/countries.module'
import { PricesModule } from '../../modules/prices/prices.module'
import { UsersModule } from '../../modules/users/users.module'
import { RolesModule } from '../../modules/roles/roles.module'
import { PermissionsModule } from '../../modules/permissions/permissions.module'
import { SeedingService } from './seeding.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from '../../entities/country.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    CountriesModule,
    PricesModule,
    UsersModule,
    RolesModule,
    PermissionsModule
  ],
  providers: [SeedingService, Logger]
})
export class SeedingModule {}
