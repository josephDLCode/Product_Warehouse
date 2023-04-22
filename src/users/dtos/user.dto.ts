import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string

  @IsNotEmpty()
  @IsString()
  readonly role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
