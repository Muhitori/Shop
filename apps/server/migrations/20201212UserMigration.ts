import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Country } from '../entities/Country'
import { Role } from '../entities/Role'

export class UserMigration20201212235632 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
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
            name: 'roleId',
            type: 'uuid',
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
      'Users',
      new TableForeignKey({
        columnNames: ['countryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Countries',
        onDelete: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'Users',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE'
      })
    )

    const [
      country
    ]: Country[] = await queryRunner.query(
      'SELECT * FROM "Countries" WHERE name = $1',
      ['Ukraine']
    )

    const [
      role
    ]: Role[] = await queryRunner.query(
      'SELECT * FROM "Roles" WHERE name = $1',
      ['Admin']
    )

    await queryRunner.query(
      `INSERT INTO "Users" ("email", "username", "password", "birthDate", "avatar", "roleId", "countryId")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      ['admin@ad.min', 'admin', 'admin', new Date(), null, role.id, country.id]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users')
  }
}
