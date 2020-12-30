import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { Category } from '../../entities/category.entity'

export class CategoryMigration20201214235633 implements MigrationInterface {
  private tableName = 'Categories'
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
      'INSERT INTO "Categories"("id", "name") VALUES (DEFAULT, $1);',
      ['Product']
    )

    const [
      { id }
    ]: Category[] = await queryRunner.query(
      'SELECT id FROM "Categories" WHERE name = $1',
      ['Product']
    )

    await queryRunner.query(
      'INSERT INTO "Categories"("id", "name", "parentCategoryId") VALUES (DEFAULT, $1, $2);',
      ['ProductSubCategory', id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
