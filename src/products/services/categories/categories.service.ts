import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Category } from 'src/products/entities/categories.entities'
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from 'src/products/dtos/categories.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  findAll() {
    return this.categoryModel.find()
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id)
    if (!category) throw new NotFoundException(`Category #${id} not found`)
    return category
  }

  create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data)
    return newCategory.save()
  }

  async update(id: string, changes: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true }
    )
    if (!category) throw new NotFoundException(`Category #${id} not found`)
    return category
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id)
    if (!category) throw new NotFoundException(`Category #${id} not found`)
    return category
  }
}
