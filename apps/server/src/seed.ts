import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SeedingModule } from './database/seeders/seeding.module'
import { SeedingService } from './database/seeders/seeding.service'

async function bootstrap() {
  NestFactory.createApplicationContext(SeedingModule)
    .then((appContext) => {
      const logger = appContext.get(Logger)
      const seeder = appContext.get(SeedingService)
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!')
        })
        .catch((error) => {
          logger.error('Seeding failed!')
          throw error
        })
        .finally(() => appContext.close())
    })
    .catch((error) => {
      throw error
    })
}
bootstrap()
