import { Injectable } from '@nestjs/common'
import toStream = require('buffer-to-stream')
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary
} from 'cloudinary'

@Injectable()
export class ImagesService {
  async uploadImage(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'products'
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      toStream(file.buffer).pipe(upload)
    })
  }
}
