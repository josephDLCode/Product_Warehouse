import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, IsEnum } from 'class-validator'

import { DocumentType } from '../models/document.model'
import { PartialType } from '@nestjs/swagger'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  @Transform(({ value }) => DocumentType[value])
  @IsEnum(DocumentType)
  documentType: DocumentType

  @IsString()
  @IsNotEmpty()
  documentNumber: string
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
