import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/options";
import SendResponseApi from "@/helpers/SendResponseApi";

const messagePostSchema = z.object({
  _id: z.string(),
  //   isAcceptingMessages: z.boolean(),
});
export async function POST(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return SendResponseApi(false, "Not Authenticated", 400);
    }
    const user: User = session.user;
    const result = messagePostSchema.safeParse(user);
    if (!result.success) {
      return SendResponseApi(false, "Invalid Data Passed", 400);
    }
    const { _id: UserId } = result.data;
    const { isAcceptingMessage } = await request.json();
    const updatedUser = await UserModel.findByIdAndUpdate(
      UserId,
      {
        isAcceptingMessage,
      },
      { new: true }
    );
    if (!updatedUser) {
      return SendResponseApi(false, "Failed to update user", 401);
    }
    return SendResponseApi(
      true,
      "Updated User Messafe Accepting Status Successfully",
      200
    );
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
export async function GET(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return SendResponseApi(false, "Not Authenticated", 400);
    }
    const user: User = session.user;
    const result = messagePostSchema.safeParse(user);
    if (!result.success) {
      return SendResponseApi(false, "Invalid Data Passed", 400);
    }
    const { _id: UserId } = result.data;
    const userToGet = await UserModel.findById(UserId);
    if (!userToGet) {
      return SendResponseApi(false, "User not found", 400);
    }
    return SendResponseApi(
      true,
      "Retrieved User Accept Status Successfully",
      200,
      { acceptStatus: userToGet.isAcceptingMessage }
    );
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
