import SendResponseApi from "@/helpers/SendResponseApi";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const queryParam = {
      userName: decodeURIComponent(searchParams.get("userName") || ""),
    };
    const { userName } = queryParam;
    const user = await UserModel.findOne({ name: userName });
    if (!user || user.isVerified) {
      return SendResponseApi(
        false,
        "User is not available or is already verified",
        400
      );
    }
    return SendResponseApi(true, "User needs to verify", 200);
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
