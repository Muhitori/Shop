import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Permission } from '../../entities/permission.entity'
import { PermissionDto } from './permission.dto'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>
  ) {}

  async getUserPermissions(userId: string): Promise<PermissionDto[] | []> {
    return this.permissionRepo.find({ userId })
  }

  async getRolePermissions(roleId: string): Promise<PermissionDto[] | []> {
    return this.permissionRepo.find({ roleId })
  }

  async create(permission: PermissionDto): Promise<any> {
    return this.permissionRepo.insert(permission)
  }

  async createMany(permissions: PermissionDto[]): Promise<any> {
    return this.permissionRepo.insert(permissions)
  }
}
