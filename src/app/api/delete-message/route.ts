import SendResponseApi from "@/helpers/SendResponseApi";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  dbConnect();
  try {
    const { userName, _id }: { userName: string; _id: string } =
      await request.json();
    console.log("running api", _id, userName);
    const user = await UserModel.findOne({ name: userName });
    console.log(user);
    if (!user) {
      return SendResponseApi(false, "User Not Found", 400);
    }

    if (user.messages.find((val) => val._id === _id)) {
      return SendResponseApi(false, "Message Not Found", 400);
    }
    const messageRemoved = user.messages.filter(
      (val) => String(val._id) !== _id
    );
    console.log(messageRemoved);
    user.messages = messageRemoved;
    await user.save();
    return SendResponseApi(true, "Message Deleted", 200);
  } catch (error: any) {
    console.log(error);
    return SendResponseApi(false, error?.message, 500);
  }
}
