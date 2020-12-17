import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderedProduct } from './OrderedProduct'
import { User } from './User'

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('uuid')
  public userId: string

  @Column('uuid')
  public orderedProductId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => Order, (order) => order.orderedProduct)
  public orderedProduct: OrderedProduct

  @ManyToOne(() => Order, (order) => order.user)
  public user: User
}
