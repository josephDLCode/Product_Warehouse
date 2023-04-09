import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Product } from 'src/products/entities/products.entities'
import {
  CreateProductDto,
  UpdateProductDto
} from 'src/products/dtos/products.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
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

  create(data: CreateProductDto) {
    const newProduct = new this.productModel(data)
    return newProduct.save()
  }

  update(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return product
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }
}
