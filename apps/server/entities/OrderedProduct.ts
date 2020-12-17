import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity('OrderedProducts')
export class OrderedProduct {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('int')
  public count: number

  @Column('uuid')
  public orderId: string

  @Column('uuid')
  public productId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => OrderedProduct, (orderedProduct) => orderedProduct.product)
  public product: Product

  @ManyToOne(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
  public order: Order
}
