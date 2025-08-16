import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Xray extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ type: Object, required: true })
  data: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type XrayDocument = Xray & Document;
export const XraySchema = SchemaFactory.createForClass(Xray);















