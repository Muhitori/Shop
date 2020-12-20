import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderedProduct } from './OrderedProduct'
import { Product } from './Product'
import { User } from './User'

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('uuid')
  public userId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @OneToMany(() => Order, (order) => order.orderedProducts)
  public orderedProducts: OrderedProduct[]

  @ManyToOne(() => Order, (order) => order.user)
  public user: User

  @ManyToMany(() => Order, (order) => order.products)
  public products: Product[]
}
