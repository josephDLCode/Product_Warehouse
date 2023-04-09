import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto'
import { Brand } from 'src/products/entities/brands.entities'

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find()
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id)
    if (!brand) throw new NotFoundException(`Brand ${id} not found`)
    return brand
  }

  create(brand: CreateBrandDto) {
    const newBrand = new this.brandModel(brand)
    return newBrand.save()
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true }
    )
    if (!brand) throw new NotFoundException(`Brand ${id} not found`)
    return brand
  }

  async remove(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id)
    if (!brand) throw new NotFoundException(`Brand ${id} not found`)
    return brand
  }
}
