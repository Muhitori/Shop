import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class RoleMigration20201210235630 implements MigrationInterface {
  private tableName = 'Roles'
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
      'INSERT INTO "Roles"("id", "name") VALUES (DEFAULT, $1), (DEFAULT, $2), (DEFAULT, $3), (DEFAULT, $4);',
      ['Guest', 'User', 'Seller', 'Admin']
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
