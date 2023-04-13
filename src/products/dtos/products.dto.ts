import { Type } from 'class-transformer'
import { PartialType } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  Min,
  IsDate,
  IsNumber,
  IsPositive,
  IsMongoId
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  readonly price: number

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly dueDate: Date

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @IsMongoId()
  @IsNotEmpty()
  readonly category: string

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string

  @IsNotEmpty()
  readonly image: Express.Multer.File // TODO: Find a way to validate this
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
