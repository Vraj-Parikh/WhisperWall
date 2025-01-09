import SendResponseApi from "@/helpers/SendResponseApi";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { IMessage } from "@/model/Message";

export async function POST(
  request: Request,
  { params }: { params: { userName: string } }
) {
  await dbConnect();
  try {
    const { userName } = await params;
    const { messageToSend }: { messageToSend: string } = await request.json();
    const user = await UserModel.findOne({ name: userName });
    if (!user) {
      return SendResponseApi(false, "User not found", 404);
    } else if (!user.isAcceptingMessage) {
      return SendResponseApi(false, "User is not accepting messages", 400);
    }
    const newMessage = {
      content: messageToSend,
      createdAt: new Date(),
    } as IMessage;
    console.log(newMessage, typeof newMessage);
    user.messages.push(newMessage);
    await user.save();
    return SendResponseApi(true, "Message Sent Successfully", 200);
  } catch (error: any) {
    console.log(error);
    return SendResponseApi(false, error?.message, 500);
  }
}
