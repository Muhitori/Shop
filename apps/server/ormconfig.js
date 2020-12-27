const envConfig = require('./src/config/envConfig')

module.exports = {
  ...envConfig(),
  synchronize: false,
  entities: ['./dist/entities/*'],
  migrations: ['./dist/migrations/*'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations'
  }
}