import React from "react";
import CustomButton from "../common/CustomButton";
import { useRouter } from "next/navigation";
const CreateAccount = () => {
  const router = useRouter();
  const navigateToSignUp = () => {
    console.log("running");
    router.push("/sign-up");
  };
  return (
    <div className="w-full space-y-1">
      <h2 className="text-center text-xs xxs:text-sm sm:text-base font-bold">
        Get Your Own Message Board
      </h2>
      <CustomButton
        className="block mx-auto xxs:font-bold"
        onClick={navigateToSignUp}
      >
        Create Your Account
      </CustomButton>
    </div>
  );
};

export default CreateAccount;
