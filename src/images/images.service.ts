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

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error)
        resolve(result)
      })
    })
  }

  async updateImage(
    publicId: string,
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    await this.deleteImage(publicId)
    return await this.uploadImage(file)
  }

  /* async uploadImages(
    files: Express.Multer.File[]
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
      toStream(files[0].buffer).pipe(upload)
    })
  } */
}
