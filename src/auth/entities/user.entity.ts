import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import * as bcrypt from 'bcryptjs'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  id: Types.ObjectId

  @Prop()
  name: string

  @Prop()
  lastName: string

  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop()
  phone: string

  @Prop({ default: ['user'] })
  role: string[]
}

export interface UserDocumentExtended extends UserDocument {
  validatePassword(password: string): Promise<boolean>
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}
