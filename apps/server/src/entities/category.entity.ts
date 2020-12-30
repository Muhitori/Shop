import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './product.entity'

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar')
  public name: string

  @Column('uuid')
  public parentCategoryId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date

  @ManyToOne(() => Category, (category) => category.parent)
  public parent: Category

  @OneToMany(() => Category, (category) => category.heirs)
  public heirs: Category[]

  @OneToMany(() => Product, (product) => product.category)
  public products: Product[]

  public hasChild(): boolean {
    return this.heirs.length > 0
  }

  public hasParent(): boolean {
    return !!this.parentCategoryId
  }
}
