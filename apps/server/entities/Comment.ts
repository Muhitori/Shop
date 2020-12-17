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
import { User } from './User'

@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public text: string

  @Column('double')
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

  @ManyToOne(() => Comment, (comment) => comment.user)
  public user: User

  @ManyToOne(() => Comment, (comment) => comment.product)
  public product: Product
}
