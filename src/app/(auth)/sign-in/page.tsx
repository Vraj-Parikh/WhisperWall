import React from "react";
import SignInForm from "@/my-components/sign-in/SignInForm";
import CustomButton from "@/my-components/common/CustomButton";
import Link from "next/link";
import { Card } from "@/components/ui/card";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Card className="w-full max-w-2xl p-5 flex flex-col justify-between items-center">
        <div className="">
          <h1 className="text-center text-4xl font-bold">
            Welcome Back To Whisper Wall
          </h1>
          <h2 className="text-center text-lg">
            Sign In to continue your secret conversations
          </h2>
        </div>
        <SignInForm />
        <div className="flex justify-center items-center">
          <h2>Not a member yet? </h2>
          {/* <CustomButton variant="link"> */}
          <Link
            href="/sign-up"
            className="text-blue-600 text-base font-semibold tracking-wide"
          >
            Sign Up
          </Link>
          {/* </CustomButton> */}
        </div>
      </Card>
    </div>
  );
};

export default page;
