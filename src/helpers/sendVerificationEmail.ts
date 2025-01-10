"use server";
import VerificationEmailTemplate from "../../emails/VerificationEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.NEXT_PUBLIC_NODEMAILER_SERVICE,
  host: process.env.NEXT_PUBLIC_NODEMAILER_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
  },
});
type VerificationEmailParams = {
  to: string;
  subject?: string;
  verificationCode: string;
  username: string;
};
export default async function sendVerificationCodeEmail({
  to,
  subject = "Whisper Wall | Verification Code",
  verificationCode,
  username,
}: VerificationEmailParams): Promise<ApiResponse> {
  console.log(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  try {
    const html = await render(
      VerificationEmailTemplate({ verificationCode, username })
    );
    await transporter.sendMail({
      from: "vrajparikh151@gmail.com",
      to: to,
      subject: subject,
      html: html,
    });
    return { success: true, message: "Email Sent Succesfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
    };
  }
}
