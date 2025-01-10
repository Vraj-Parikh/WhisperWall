import { getServerSession, User } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import SendResponseApi from "@/helpers/SendResponseApi";
import mongoose from "mongoose";
import UserModel from "@/model/User";

const messagePostSchema = z.object({
  _id: z.string(),
  //   isAcceptingMessages: z.boolean(),
});
export async function GET() {
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
    const { _id } = result.data;
    const userId = new mongoose.Types.ObjectId(_id);
    const userAggregate = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!userAggregate || userAggregate.length == 0) {
      return SendResponseApi(false, "User not found", 400);
    }
    return SendResponseApi(true, "Messages Retrieved", 200, {
      AllMessages: userAggregate[0].messages,
    });
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
