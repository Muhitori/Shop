import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { Role } from '../../entities/role.entity'
import { User } from '../../entities/user.entity'
export class PermissionMigration20201213235630 implements MigrationInterface {
  private tableName = 'Permissions'
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
            name: 'userId',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'roleId',
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
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE'
      })
    )

    const roles: Role[] = await queryRunner.query('SELECT * FROM "Roles"')

    const [
      { id }
    ]: User[] = await queryRunner.query(
      'SELECT id FROM "Users" WHERE username = $1',
      ['admin']
    )

    await queryRunner.query(
      `INSERT INTO "Permissions"("id", "name", "userId", "roleId") VALUES
      (DEFAULT, $1, $2, $3),
      (DEFAULT, $4, $5, $6),
      (DEFAULT, $7, $8, $9),
      (DEFAULT, $10, $11, $12);`,
      [
        'GODLY PERMISSIONS',
        id,
        roles[0].id,
        'SELLER PERMISSIONS',
        id,
        roles[1].id,
        'USER PERMISSIONS',
        id,
        roles[2].id,
        'NO PERMISSIONS',
        id,
        roles[3].id
      ]
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
