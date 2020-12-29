import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Country } from '../entities/Country'
import { Role } from '../entities/Role'

export class ProductMigration20201215235635 implements MigrationInterface {
  private tableName = 'Products'
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'rating',
            type: 'double precision',
            isNullable: false
          },
          {
            name: 'priceId',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'categoryId',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: true
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['priceId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Prices',
        onDelete: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Categories',
        onDelete: 'CASCADE'
      })
    )

    const [
      price
    ]: Country[] = await queryRunner.query(
      'SELECT * FROM "Prices" WHERE value = $1',
      [100]
    )

    const [
      category
    ]: Role[] = await queryRunner.query(
      'SELECT * FROM "Categories" WHERE name = $1',
      ['ProductSubCategory']
    )

    await queryRunner.query(
      `INSERT INTO "Products" ("name", "description", "rating", "priceId", "categoryId")
      VALUES ($1, $2, $3, $4, $5);`,
      ['test', 'test description', 4.5, price.id, category.id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
