import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Category } from './Category'
import { Price } from './Price'

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public title: string

  @Column('varchar')
  public description: string

  @Column('double')
  public rating: number

  @Column('uuid')
  public priceId: string

  @Column('uuid')
  public categoryId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => Product, (product) => product.category)
  public category: Category

  @ManyToOne(() => Product, (product) => product.price)
  public price: Price
}
