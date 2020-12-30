import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './product.entity'
import { User } from './user.entity'

@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public text: string

  @Column('int')
  public rating: string

  @Column('uuid')
  public productId: string

  @Column('uuid')
  public userId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => User, (user) => user.comments)
  public user: User

  @ManyToOne(() => Product, (product) => product.comments)
  public product: Product
}
