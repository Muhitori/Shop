const envConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      username: 'postgres',
      password: 'postgres',
      database: 'angular-nestjs-shop-db',
      host: '127.0.0.1',
      type: 'postgres',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  } else {
    return {
      username: 'postgres',
      password: 'postgres',
      database: 'angular-nestjs-shop-db',
      host: '127.0.0.1',
      type: 'postgres'
    }
  }
}

module.exports = envConfig
