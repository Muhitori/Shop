import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CountryMigration20201211235631 implements MigrationInterface {
  private tableName = "Countries";
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
      'INSERT INTO $1("id", "name") VALUES (DEFAULT, $2), (DEFAULT, $3), (DEFAULT, $4);',
      [this.tableName, 'Ukraine', 'Russia', 'USA']
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
