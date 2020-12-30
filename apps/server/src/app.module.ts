import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { CountriesModule } from './modules/countries/countries.module'
import { RolesGuard } from './modules/auth/guards/roles.guard'
import { JwtAuthGuard } from './modules/auth/guards/jwtAuth.guard'
import { PermissionsModule } from './modules/permissions/permissions.module'
import { SeedingModule } from './database/seeders/seeding.module'
import { PricesModule } from './modules/prices/prices.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    RolesModule,
    CountriesModule,
    PermissionsModule,
    PricesModule,
    SeedingModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
