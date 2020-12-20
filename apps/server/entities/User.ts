import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Country } from './Country'
import { Role } from './Role'

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

  @ManyToOne(() => User, (user) => user.country)
  public country: Country

  @ManyToOne(() => User, (user) => user.role)
  public role: Role

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
