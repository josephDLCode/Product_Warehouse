import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string

  @Prop()
  description: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
