import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Country } from './Country'
import { Role } from './Role'
import { Order } from './Order'
import { Comment } from './Comment'

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
  public roleId: string

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

  @ManyToOne(() => Role, (role) => role.users)
  public role: Role

  @OneToMany(() => Order, (order) => order.user)
  public orders: Order[]

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[]

  constructor(
    email: string,
    username: string,
    password: string,
    countryId: string,
    roleId: string
  ) {
    this.email = email
    this.username = username
    this.password = password
    this.countryId = countryId
    this.roleId = roleId
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 2)
  }

  async unecryptedPasswordIsValid(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}
