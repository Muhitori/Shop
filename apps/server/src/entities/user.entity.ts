import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Country } from './country.entity'
import { Role } from './role.entity'
import { Order } from './order.entity'
import { Comment } from './comment.entity'
import { Permission } from './permission.entity'

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public email: string

  @Column('varchar')
  public username: string

  @Column('varchar')
  public password: string

  @Column('date')
  public birthDate: Date

  @Column('varchar')
  public avatar: string

  @Column('uuid')
  public countryId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => Country, (country) => country.users)
  public country: Country

  @OneToMany(() => Order, (order) => order.user)
  public orders: Order[]

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[]

  @OneToMany(() => Permission, (permission) => permission.user)
  public permissions: Permission[]

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'Permissions',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId' }]
  })
  public roles: Role[]

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 2)
  }

  constructor(
    email: string,
    username: string,
    password: string,
    birthDate: Date,
    countryId: string
  ) {
    this.email = email
    this.username = username
    this.password = password
    this.birthDate = birthDate
    this.countryId = countryId
  }
}
