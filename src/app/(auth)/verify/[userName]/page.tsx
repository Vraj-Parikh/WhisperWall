import VerifyCard from "@/my-components/verify/VerifyCard";
import { NextPage } from "next";
import React from "react";

interface PageProps {
  params: {
    userName: string;
  };
}
const page: NextPage<PageProps> = async ({ params }) => {
  const { userName } = await params;
  return (
    <div className="flex justify-center items-center flex-grow px-4">
      <VerifyCard userName={userName} />
    </div>
  );
};

export default page;
