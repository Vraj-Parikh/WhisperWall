import SendResponseApi from "@/helpers/SendResponseApi";
import sendVerificationCodeEmail from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      userName: decodeURIComponent(searchParams.get("userName") || ""),
    };
    const { userName } = queryParam;
    const user = await UserModel.findOne({ user: userName });
    if (!user || user.isVerified) {
      return SendResponseApi(false, "User Not Found || is verified ", 400);
    }
    const newOTP = Math.floor(Math.random() * 1000000).toString();
    user.verifyCode = newOTP;
    const expiryTimeMinutes: number =
      Number(process.env.VERIFYCODE_EXPIRY_TIME_IN_MIN) || 10;
    user.verifyCodeExpiredAt = new Date(
      Date.now() + 1000 * 60 * expiryTimeMinutes
    );
    await user.save();
    await sendVerificationCodeEmail({
      to: user.email,
      verificationCode: newOTP,
      username: userName,
    });
    return SendResponseApi(true, "New OTP Sent", 200);
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
