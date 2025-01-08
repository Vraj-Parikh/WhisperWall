import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignUpForm from "@/my-components/sign-up/SignUpForm";
const page = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center px-2 shadow-lg">
      <Card className="w-full max-w-2xl p-5 flex flex-col justify-between items-center lg:p-12">
        <div className="mb-4 sm:mb-6 spaace-y-2 sm:space-y-3">
          <h1 className="text-center text-lg xxs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Join Whisper Wall
          </h1>
          <h2 className="text-center text-sm xs:text-base lg:text-lg">
            Sign Up to start your secret conversations
          </h2>
        </div>
        <SignUpForm />
        <div className="flex justify-center items-center mt-4 text-sm sm:text-base md:text-lg gap-1">
          <h2>Already a member? </h2>
          <Link
            href="/sign-in"
            className="font-bold text-blue-600 cursor-pointer border-b-2 border-transparent hover:border-black transition-color"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default page;
