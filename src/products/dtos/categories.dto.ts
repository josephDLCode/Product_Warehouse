import { PartialType } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
