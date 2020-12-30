import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Permission } from './permission.entity'
import { User } from './user.entity'

@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public name: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToMany(() => User, (user) => user.roles)
  public users: User[]

  @OneToMany(() => Permission, (permission) => permission.role)
  public permissions: Permission[]
}
