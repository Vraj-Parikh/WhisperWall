import VerifyCard from "@/my-components/verify/VerifyCard";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    userName: string;
  };
}
const page: NextPage<PageProps> = async ({ params }) => {
  const { userName } = await params;
  const res = await fetch(
    `http://localhost:3000/api/can-user-verify?userName=${userName}`
  );
  const response = await res.json();
  if (!response.success) {
    return notFound();
  }
  return (
    <div className="flex justify-center items-center flex-grow px-4">
      <VerifyCard userName={userName} />
    </div>
  );
};

export default page;
