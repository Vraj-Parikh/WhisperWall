import { type NextPage } from "next";
import Main from "@/my-components/send-messages/Main";
import { notFound } from "next/navigation";

interface ApiResponse {
  verifiedUserExist: boolean;
}

interface PageProps {
  params: Promise<{
    userName: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const userName = (await params).userName;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const API_URL = `${BASE_URL}/api/is-username-unique?username=${userName}`;
  try {
    const response = await fetch(API_URL);
    const data: ApiResponse = await response.json();
    if (!data.verifiedUserExist) {
      return notFound();
    }
  } catch (error) {
    console.error(error);
    return notFound();
  }
  return (
    <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 mx-auto max-w-5xl flex flex-col justify-center items-center flex-grow">
      <Main userName={userName} />
    </div>
  );
};

export default Page;
