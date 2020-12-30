import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class SeedingLog {
  @PrimaryColumn()
  public id: string

  @CreateDateColumn()
  creationDate: Date

  constructor(id?: string) {
    this.id = id
  }
}
