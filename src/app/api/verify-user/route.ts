import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { userName, verificationCode } = await request.json();
    const user = await UserModel.findOne({ name: userName });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    if (user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User already verified",
        },
        { status: 400 }
      );
    }
    const isVerifyCodeExpired =
      Date.now() - user.verifyCodeExpiredAt.getTime() > 0;
    if (isVerifyCodeExpired) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification Code Expired",
        },
        { status: 400 }
      );
    } else if (user.verifyCode === verificationCode) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        {
          success: true,
          message: "User Verified",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Invalid Verification Code Entered",
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { success: false, message: error?.message },
      { status: 500 }
    );
  }
}
