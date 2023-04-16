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

  async update(
    id: string,
    changes: UpdateProductDto,
    image: Express.Multer.File
  ) {
    const product = await this.findOne(id)
    const newChanges: any = { ...changes }
    if (image) {
      const updatedImg = await this.imagesService.updateImage(
        product.image.public_id,
        image
      )
      newChanges.image = {
        url: updatedImg.url,
        public_id: updatedImg.public_id
      }
    }
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: newChanges },
      { new: true }
    )
    return updatedProduct
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.imagesService.deleteImage(product.image.public_id)
    return this.productModel.findByIdAndDelete(id)
  }
}
