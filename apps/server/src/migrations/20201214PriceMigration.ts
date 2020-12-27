import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Country } from '../entities/Country'

export class PriceMigration20201214235634 implements MigrationInterface {
  private tableName = "Prices";
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
            name: 'value',
            type: 'double precision',
            isNullable: false
          },
          {
            name: 'discount',
            type: 'int',
            isNullable: true
          },
          {
            name: 'currency',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'countryId',
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
        columnNames: ['countryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Countries',
        onDelete: 'CASCADE'
      })
    )

    const [
      { id }
    ]: Country[] = await queryRunner.query(
      'SELECT id FROM "Countries" WHERE name = $1',
      ['Ukraine']
    )

    await queryRunner.query(
      'INSERT INTO "Prices"("id", "value", "discount", "currency", "countryId") VALUES (DEFAULT, $1, $2, $3, $4);',
      [100, 0, 'Dollar', id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
