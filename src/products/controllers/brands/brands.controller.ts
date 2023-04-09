import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'
import { BrandsService } from 'src/products/services/brands/brands.service'
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto'

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsServices: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsServices.findAll()
  }

  @Get(':id')
  getBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandsServices.findOne(id)
  }

  @Post()
  createBrand(@Body() body: CreateBrandDto) {
    return this.brandsServices.create(body)
  }

  @Put(':id')
  updateBrand(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateBrandDto
  ) {
    return this.brandsServices.update(id, body)
  }

  @Delete(':id')
  deleteBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandsServices.remove(id)
  }
}
