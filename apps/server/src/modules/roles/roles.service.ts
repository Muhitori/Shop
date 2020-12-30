import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../../entities/role.entity'
import { RoleDto } from './roles.dto'

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async getAll(): Promise<RoleDto[] | []> {
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

  async getRoleById(id: string): Promise<RoleDto | null> {
    return this.roleRepo.findOne(id)
  }

  async create(role: RoleDto): Promise<any> {
    return this.roleRepo.insert(role)
  }

  async createMany(roles: RoleDto[]): Promise<any> {
    return this.roleRepo.insert(roles)
  }
}
