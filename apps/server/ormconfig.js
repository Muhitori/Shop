// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('./src/config/envConfig')

module.exports = {
  ...envConfig(),
  synchronize: false,
  entities: ['./dist/entities/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations'
  }
}
