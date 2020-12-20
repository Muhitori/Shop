import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity('OrderedProducts')
export class OrderedProduct {
  @PrimaryColumn('uuid')
  public orderId: string

  @PrimaryColumn('uuid')
  public productId: string

  @Column('int')
  public count: number

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
