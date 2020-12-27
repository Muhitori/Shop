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
import { Category } from './Category'
import { Image } from './Image'
import { Order } from './Order'
import { OrderedProduct } from './OrderedProduct'
import { Price } from './Price'
import { Comment } from './Comment'

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public name: string

  @Column('varchar')
  public description: string

  @Column('double precision')
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

  @ManyToOne(() => Category, (category) => category.products)
  public category: Category

  @ManyToOne(() => Price, (price) => price.products)
  public price: Price

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.product)
  public orderedProducts: OrderedProduct[]

  @ManyToMany(() => Order, (order) => order.products)
  public orders: Order[]

  @OneToMany(() => Image, (image) => image.product)
  public images: Image[]

  @OneToMany(() => Comment, (comment) => comment.product)
  public comments: Comment[]
}
