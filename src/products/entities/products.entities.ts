import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Category } from './categories.entities'
import { Brand } from './brands.entities'

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ type: Number, required: true })
  price: number

  @Prop({ type: Date, required: true })
  dueDate: Date

  @Prop({ type: Number, required: true, default: 0 })
  stock: number

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)
