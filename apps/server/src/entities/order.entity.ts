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
import { OrderedProduct } from './orderedProduct.entity'
import { Product } from './product.entity'
import { User } from './user.entity'

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

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
  public orderedProducts: OrderedProduct[]

  @ManyToOne(() => User, (user) => user.orders)
  public user: User

  @ManyToMany(() => Product, (product) => product.orders)
  public products: Product[]
}
