import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Country } from '../../entities/country.entity'
import { Role } from '../../entities/role.entity'

export class CommentMigration20201218235637 implements MigrationInterface {
  private tableName = 'Comments'
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
            name: 'text',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'rating',
            type: 'int',
            isNullable: false
          },
          {
            name: 'productId',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'userId',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE'
      })
    )

    const [
      product
    ]: Role[] = await queryRunner.query(
      'SELECT * FROM "Products" WHERE name = $1',
      ['test']
    )

    const [
      user
    ]: Country[] = await queryRunner.query(
      'SELECT * FROM "Users" WHERE username = $1',
      ['admin']
    )

    await queryRunner.query(
      `INSERT INTO "Comments" ("text", "rating", "productId", "userId")
      VALUES ($1, $2, $3, $4);`,
      ['test comment', 4, product.id, user.id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
