import React from "react";
import SignInForm from "@/my-components/sign-in/SignInForm";
import CustomButton from "@/my-components/common/CustomButton";
import Link from "next/link";
import { Card } from "@/components/ui/card";
const page = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center px-2 shadow-lg">
      <Card className="w-full max-w-2xl p-5 flex flex-col justify-between items-center lg:p-12">
        <div className="mb-4 sm:mb-6 spaace-y-2 sm:space-y-3">
          <h1 className="text-center text-lg xxs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Welcome Back To Whisper Wall
          </h1>
          <h2 className="text-center text-sm xs:text-base lg:text-lg">
            Sign In to continue your secret conversations
          </h2>
        </div>
        <SignInForm />
        <div className="flex justify-center items-center mt-4 text-sm sm:text-base md:text-lg gap-1">
          <h2>Not a member yet? </h2>
          <Link
            href="/sign-up"
            className="font-bold text-blue-600 cursor-pointer border-b-2 border-transparent hover:border-black transition-colors"
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
