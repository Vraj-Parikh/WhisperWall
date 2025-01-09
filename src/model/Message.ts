import { Schema } from "mongoose";

export interface IMessage extends Document {
  content: string;
  createdAt: Date;
}
export const MessageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
