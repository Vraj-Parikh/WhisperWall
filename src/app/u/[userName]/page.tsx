import { type NextPage } from "next";
import Main from "@/my-components/send-messages/Main";
interface PageProps {
  params: {
    userName: string;
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { userName } = await params;
  return (
    <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 mx-auto max-w-5xl min-h-screen flex flex-col justify-center items-center py-8">
      <Main userName={userName} />
    </div>
  );
};

export default Page;
