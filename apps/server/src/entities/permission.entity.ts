import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity
} from 'typeorm'
import { User } from './user.entity'
import { Role } from './role.entity'

@Entity('Permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public name: string

  @Column('uuid')
  public userId: string

  @Column('uuid')
  public roleId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => User, (user) => user.permissions)
  public user: User

  @ManyToOne(() => Role, (role) => role.permissions)
  public role: Role
}
