"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import CustomButton from "../common/CustomButton";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const Dashboard = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const [isAcceptingMessage, setIsAcceptingMessage] = useState<boolean>(
    session?.user.isAcceptionMessages || true
  );
  const linkRef = useRef<HTMLHeadingElement | null>(null);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/u/${session?.user.name}`
    );
  };
  return (
    <div className="flex-grow container mx-auto flex flex-col gap-1">
      <h1 className=" text-xl xxs:text-2xl md:text-3xl lg:text-4xl font-bold">
        User Dashboard
      </h1>
      <h2 className="text-sm sm:text-base xxs:font-bold mt-1">
        Copy Your Unique Link
      </h2>
      <div className="flex items-stretch">
        <h2
          className="flex-grow bg-gray-300 text-black xxs:font-bold rounded-l-md border-t-0 text-sm xs:text-base justify-start items-center flex px-2 tracking-wide"
          ref={linkRef}
        >
          {`http://localhost:3000/u/${session?.user.name}`}
        </h2>
        <CustomButton
          className="block rounded-l-none py-1 h-full font-bold"
          onClick={handleCopyLink}
        >
          Copy
        </CustomButton>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Switch
          id="accepting-messages"
          checked={isAcceptingMessage}
          onCheckedChange={(checked) => setIsAcceptingMessage(checked)}
          className="scale-75 lg:scale-90"
        />
        <Label htmlFor="accepting-messages">
          <h2
            className={`font-bold lg:text-xl ${isAcceptingMessage ? "text-green-600" : "text-red-400"}`}
          >
            {!isAcceptingMessage && "Not"} Accepting Message
          </h2>
        </Label>
      </div>
      <CustomButton
        className="border !p-1.5 sm:!p-2 md:!p-3 self-start mt-2"
        variant={"ghost"}
      >
        <RefreshCw strokeWidth={3} />
      </CustomButton>
      <Separator className="my-1" />
    </div>
  );
};

export default Dashboard;
