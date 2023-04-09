import { isMongoId } from 'class-validator'
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common'

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isMongoId(value))
      throw new BadRequestException(`${value} is a invalid Mongo ID`)
    return value
  }
}
