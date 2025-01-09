import mongoose, { Schema, Document, Types } from "mongoose";
import { IMessage, MessageSchema } from "./Message";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiredAt: Date;
  isAcceptingMessage: boolean;
  messages: IMessage[];
}
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      unique: [true, "User Name already exist"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiredAt: {
      type: Date,
      required: true,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
      required: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
export default UserModel;
