import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Country } from './Country'

@Entity('Prices')
export class Price {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('double')
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

  @ManyToOne(() => Price, (price) => price.country)
  public country: Country
}
