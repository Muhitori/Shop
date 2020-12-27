import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Product } from '../entities/Product'

export class ImageMigration20201216235636 implements MigrationInterface {
  private tableName = "Images";
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
            name: 'url',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'productId',
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
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Products',
        onDelete: 'CASCADE'
      })
    )

    const [
      { id }
    ]: Product[] = await queryRunner.query(
      'SELECT id FROM "Products" WHERE name = $1',
      ['test']
    )

    await queryRunner.query(
      'INSERT INTO "Images"("id", "url", "productId") VALUES (DEFAULT, $1, $2);',
      [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGYBq9sbINiYagdSRKn4wQVufUF-7FbllYA&usqp=CAU',
        id
      ]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
