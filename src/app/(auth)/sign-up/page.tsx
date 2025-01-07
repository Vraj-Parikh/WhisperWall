import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignUpForm from "@/my-components/sign-up/SignUpForm";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Card className="w-full max-w-2xl p-5 flex flex-col justify-between items-center">
        <div className="">
          <h1 className="text-center text-4xl font-bold">Join Whisper Wall</h1>
          <h2 className="text-center text-lg">
            Sign Up to start your secret conversations
          </h2>
        </div>
        <SignUpForm />
        <div className="flex justify-center items-center">
          <h2>Already a member? </h2>
          {/* <CustomButton variant="link"> */}
          <Link
            href="/sign-in"
            className="text-blue-600 text-base font-semibold tracking-wide"
          >
            Sign In
          </Link>
          {/* </CustomButton> */}
        </div>
      </Card>
    </div>
  );
};

export default page;
