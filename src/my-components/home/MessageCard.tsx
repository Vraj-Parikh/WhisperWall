import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextPage } from "next";
import { Mail } from "lucide-react";
export type MessageCardProps = {
  msgFrom: string;
  msg: string;
  sendTime: string;
};
const MessageCard: NextPage<MessageCardProps> = ({
  msg,
  msgFrom,
  sendTime,
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="text-sm xxs:text-base md:text-lg pl-7">
          Message From {msgFrom}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 px-4">
        <Mail size={20} className="shrink-0" />
        <div className="">
          <h2 className="text-sm sm:text-base">{msg}</h2>
          <h3 className="text-gray-500 text-sm italic">{sendTime}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
