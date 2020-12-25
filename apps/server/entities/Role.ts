import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

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

  @OneToMany(() => User, (user) => user.role)
  public users: User[]
}
