import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Country } from '../../entities/country.entity'

export class UserMigration20201212235632 implements MigrationInterface {
  private tableName = 'Users'
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
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'username',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'birthDate',
            type: 'timestamptz',
            isNullable: false
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '255',
            isNullable: true
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
      country
    ]: Country[] = await queryRunner.query(
      'SELECT * FROM "Countries" WHERE name = $1',
      ['Ukraine']
    )
    await queryRunner.query(
      `INSERT INTO "Users" ("email", "username", "password", "birthDate", "avatar", "countryId")
      VALUES ($1, $2, $3, $4, $5, $6);`,
      ['admin@ad.min', 'admin', 'admin', new Date(), null, country.id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
