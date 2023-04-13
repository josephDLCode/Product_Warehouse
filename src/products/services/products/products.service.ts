import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'

import { Product } from 'src/products/entities/products.entities'
import {
  CreateProductDto,
  UpdateProductDto
} from 'src/products/dtos/products.dto'
import { ImagesService } from 'src/images/images.service'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private imagesService: ImagesService
  ) {}

  findAll() {
    return this.productModel.find().populate(['category', 'brand'])
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate(['category', 'brand'])
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return product
  }

  async create(body: CreateProductDto, image: Express.Multer.File) {
    return await this.imagesService
      .uploadImage(image)
      .then((result) => {
        const newProduct = new this.productModel({
          ...body,
          image: {
            url: result.url,
            public_id: result.public_id
          }
        })
        return newProduct.save()
      })
      .catch((error) => {
        throw new BadRequestException(error)
      })
  }

  update(id: string, changes: UpdateProductDto, image: Express.Multer.File) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    product.then((product) => {
      if (image) {
        this.imagesService
          .uploadImage(image)
          .then((result) => {
            product.image.url = result.url
            product.image.public_id = result.public_id
            product.save()
          })
          .catch((error) => {
            throw new BadRequestException(error)
          })
      }
    })
    return product
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }
}
