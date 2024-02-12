import { Module, ValidationPipe } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import * as dotenv from 'dotenv'
import { APP_PIPE } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/pixxel-api'
    ),
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
