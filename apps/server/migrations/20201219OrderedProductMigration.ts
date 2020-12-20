import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { User } from '../entities/User'

// eslint-disable-next-line prettier/prettier
export class OrderedProductMigration20201219235639 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OrderedProducts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true
          },
          {
            name: 'count',
            type: 'int',
            isNullable: false
          },
          {
            name: 'orderId',
            type: 'uuid',
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
      'OrderedProducts',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Orders',
        onDelete: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'OrderedProducts',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Products',
        onDelete: 'CASCADE'
      })
    )

    const [
      user
    ]: User[] = await queryRunner.query(
      'SELECT * FROM "Users" WHERE username = $1',
      ['admin']
    )

    const [
      order
    ]: User[] = await queryRunner.query(
      'SELECT * FROM "Orders" WHERE "userId" = $1',
      [user.id]
    )

    const [
      product
    ]: User[] = await queryRunner.query(
      'SELECT * FROM "Products" WHERE name = $1',
      ['test']
    )

    await queryRunner.query(
      `INSERT INTO "OrderedProducts" ("id", "count", "orderId", "productId")
      VALUES (DEFAULT, $1, $2, $3);`,
      [1, order.id, product.id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('OrderedProducts')
  }
}
