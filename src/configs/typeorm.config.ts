import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import 'dotenv/config'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.PORT,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
}
