import SendResponseApi from "@/helpers/SendResponseApi";
import dbConnect from "@/lib/dbConnect";
import UserModel, { IMessage } from "@/model/User";

export async function POST(
  request: Request,
  { params }: { params: { userName: string } }
) {
  await dbConnect();
  try {
    const { userName } = await params;
    const { messageToSend } = await request.json();
    const user = await UserModel.findOne({ name: userName });
    if (!user) {
      return SendResponseApi(false, "User not found", 404);
    } else if (!user.isAcceptingMessage) {
      return SendResponseApi(false, "User is not accepting messages", 400);
    }
    const newMessage: IMessage = {
      content: messageToSend,
      createdAt: new Date(),
    };
    console.log(newMessage);
    //TODO push message to user but user message array is of objectid
    return SendResponseApi(true, "Message Sent Successfully", 200);
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
