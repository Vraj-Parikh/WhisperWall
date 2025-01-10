import VerifyCard from "@/my-components/verify/VerifyCard";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{
    userName: string;
  }>;
}
const page: NextPage<PageProps> = async ({ params }) => {
  const userName = (await params).userName;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(
      `${BASE_URL}/api/can-user-verify?userName=${userName}`
    );
    const response = await res.json();
    if (!response.success) {
      return notFound();
    }
  } catch (error) {
    console.error(error);
    return notFound();
  }

  return (
    <div className="flex justify-center items-center flex-grow px-4">
      <VerifyCard userName={userName} />
    </div>
  );
};

export default page;
