import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'
import {
  CreateProductDto,
  UpdateProductDto
} from 'src/products/dtos/products.dto'
import { ProductsService } from 'src/products/services/products/products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.findAll()
  }

  @Get(':id')
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id)
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.create(body)
  }

  @Put(':id')
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() changes: UpdateProductDto
  ) {
    return this.productsService.update(id, changes)
  }

  @Delete(':id')
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id)
  }
}
