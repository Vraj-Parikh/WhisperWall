"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import CustomButton from "../common/CustomButton";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
const Dashboard = () => {
  const { data: session, status } = useSession();
  const [isAcceptingMessage, setIsAcceptingMessage] = useState<boolean>(
    session?.user.isAcceptionMessages || true
  );
  console.log(session?.user);
  const handleCopyLink = () => {
    // Clipboard
  };
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <h1 className="font-bold text-4xl">User Dashboard</h1>
      <h2 className="font-bold text-lg">Copy Your Unique Link</h2>
      <div className="flex">
        <Input
          type="text"
          disabled
          value={`http://localhost:3000/u/${session?.user.name}`}
          className="flex-grow bg-gray-400 text-black font-bold rounded-r-none border-t-0"
        />
        <CustomButton className="rounded-l-none" onClick={handleCopyLink}>
          Copy
        </CustomButton>
      </div>
      <div className="flex items-center gap-4">
        <Switch
          id="accepting-messages"
          checked={isAcceptingMessage}
          onCheckedChange={(checked) => setIsAcceptingMessage(checked)}
        />
        <Label htmlFor="accepting-messages font-bold">
          {!isAcceptingMessage && "Not"} Accepting Message
        </Label>
      </div>
      <CustomButton className="border p-4 self-start" variant={"ghost"}>
        <RefreshCw strokeWidth={3} />
      </CustomButton>
      <Separator className="my-4" />
    </div>
  );
};

export default Dashboard;
