import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './Product'

@Entity('Images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public url: string

  @Column('uuid')
  public productId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => Product, (product) => product.images)
  public product: Product
}
