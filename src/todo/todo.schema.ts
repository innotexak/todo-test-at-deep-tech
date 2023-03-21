import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;
}
const TodoSchema = SchemaFactory.createForClass(Todo);

export { TodoSchema };
