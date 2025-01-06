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
    <div className="w-full">
      <h2 className="text-center">Get Your Own Message Board</h2>
      <CustomButton className="block mx-auto" onClick={navigateToSignUp}>
        Create Your Account
      </CustomButton>
    </div>
  );
};

export default CreateAccount;
