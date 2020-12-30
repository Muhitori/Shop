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
import { Country } from './country.entity'
import { Product } from './product.entity'

@Entity('Prices')
export class Price {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('double precision')
  public value: number

  @Column('int')
  public discount: number

  @Column('varchar')
  public currency: string

  @Column('uuid')
  public countryId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => Country, (country) => country.price)
  public country: Country

  @OneToMany(() => Product, (product) => product.price)
  public products: Product[]
}
