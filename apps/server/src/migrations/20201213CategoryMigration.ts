import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { Category } from '../entities/Category'

export class CategoryMigration20201213235633 implements MigrationInterface {
  private tableName = "Categories";
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
            isNullable: false
          },
          {
            name: 'parentCategoryId',
            type: 'varchar',
            length: '255',
            isNullable: true
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

    await queryRunner.query(
      'INSERT INTO $1("id", "name") VALUES (DEFAULT, $2);',
      [this.tableName, 'Product']
    )

    const [
      { id }
    ]: Category[] = await queryRunner.query(
      'SELECT id FROM $1 WHERE name = $2',
      [this.tableName, 'Product']
    )

    await queryRunner.query(
      'INSERT INTO $1("id", "name", "parentCategoryId") VALUES (DEFAULT, $2, $3);',
      [this.tableName, 'ProductSubCategory', id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
