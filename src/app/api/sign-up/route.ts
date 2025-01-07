import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import sendVerificationCodeEmail from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, password, email } = await request.json();
    let user = await UserModel.findOne({ email });
    if (user?.isVerified) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    const verificationCode = String(Math.floor(Math.random() * 1000000));
    const hashedPassword = await bcrypt.hash(password, 10);
    const ENVexpiryTimeMins = process.env.VERIFYCODE_EXPIRY_TIME_IN_MIN;
    const expiryTimeMins = Number.isNaN(ENVexpiryTimeMins)
      ? 10
      : Number(ENVexpiryTimeMins);
    const expiryDate = new Date(
      new Date().getTime() + 1000 * 60 * expiryTimeMins
    );
    // expiryDate.setHours(expiryDate.getHours() + 1);
    if (!user) {
      user = await UserModel.create({
        name: username,
        email: email,
        password: hashedPassword,
        role: "user",
        isVerified: false,
        verifyCode: verificationCode,
        verifyCodeExpiredAt: expiryDate,
        isAcceptionMessage: true,
        messages: [],
      });
    } else {
      console.log(user);
      user.password = hashedPassword;
      user.verifyCode = verificationCode;
      user.verifyCodeExpiredAt = expiryDate;
      await user.save();
    }
    //send code email
    const emailResponse = await sendVerificationCodeEmail({
      to: email,
      verificationCode,
      username: user.name,
    });
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "User Registered Successfully. Please verify your email",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error Registering User",
      },
      {
        status: 500,
      }
    );
  }
}
