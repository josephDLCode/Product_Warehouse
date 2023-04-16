import { Express } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator
} from '@nestjs/common'

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'
import { ProductsService } from 'src/products/services/products/products.service'
import {
  CreateProductDto,
  UpdateProductDto
} from 'src/products/dtos/products.dto'

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
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/*' })
        ]
      })
    )
    image: Express.Multer.File
  ) {
    return this.productsService.create(body, image)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() changes: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/*' })
        ],
        fileIsRequired: false
      })
    )
    image: Express.Multer.File
  ) {
    return this.productsService.update(id, changes, image)
  }

  @Delete(':id')
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id)
  }
}
