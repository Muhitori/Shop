import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../../entities/Role'
import { RoleDto } from './roles.dto'

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async getAllRoles(): Promise<RoleDto[] | []> {
    return this.roleRepo.find({
      join: {
        alias: 'roles',
        leftJoinAndSelect: {
          users: 'roles.users'
        }
      }
    })
  }

  async getRoleByName(name: string): Promise<RoleDto | null> {
    return this.roleRepo.findOne({ name })
  }
}
