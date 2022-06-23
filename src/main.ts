import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from 'config'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const port: number = config.get('server.port')

  await app.listen(process.env.PORT || port)
  Logger.log(`Application running on port ${process.env.PORT || port}`)
}
bootstrap()
