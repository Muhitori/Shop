import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import { CountriesModule } from '../countries/countries.module'
import { RolesModule } from '../roles/roles.module'
import { PermissionsModule } from '../permissions/permissions.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CountriesModule,
    RolesModule,
    PermissionsModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
