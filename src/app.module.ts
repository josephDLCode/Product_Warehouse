import * as Joi from 'joi'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import config from './config'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'
import { ImagesService } from './images/images.service'
import { ImagesModule } from './images/images.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required()
      })
    }),
    ProductsModule,
    DatabaseModule,
    ImagesModule
  ],
  controllers: [AppController],
  providers: [AppService, ImagesService]
})
export class AppModule {}
