import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Brand, BrandSchema } from './entities/brands.entities'
import { BrandsService } from './services/brands/brands.service'
import { Product, ProductSchema } from './entities/products.entities'
import { ProductsService } from './services/products/products.service'
import { Category, CategorySchema } from './entities/categories.entities'
import { BrandsController } from './controllers/brands/brands.controller'
import { CategoriesService } from './services/categories/categories.service'
import { ProductsController } from './controllers/products/products.controller'
import { CategoriesController } from './controllers/categories/categories.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Brand.name, schema: BrandSchema }
    ])
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService]
})
export class ProductsModule {}
