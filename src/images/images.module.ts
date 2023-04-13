import { Module } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { ImagesService } from './images.service'

@Module({
  providers: [
    ImagesService,
    {
      provide: 'CLOUDINARY',
      useFactory: async () => {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
        })
        return cloudinary
      }
    }
  ],
  exports: [ImagesService]
})
export class ImagesModule {}
