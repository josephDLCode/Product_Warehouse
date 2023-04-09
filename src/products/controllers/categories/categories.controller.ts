import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'
import { CategoriesService } from 'src/products/services/categories/categories.service'
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from 'src/products/dtos/categories.dto'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesServices.findAll()
  }

  @Get(':id')
  getCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesServices.findOne(id)
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesServices.create(body)
  }

  @Put(':id')
  updateCategory(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateCategoryDto
  ) {
    return this.categoriesServices.update(id, body)
  }

  @Delete(':id')
  deleteCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesServices.remove(id)
  }
}
