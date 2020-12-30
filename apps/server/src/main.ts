import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('Angular NestJS Shop')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .addTag('shop')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT)
}
bootstrap()
