import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomIcon from "../common/CustomIcon";
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
      <CardHeader>
        <CardTitle>Message From {msgFrom}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Mail size={20} />
        <div className="">
          <h2>{msg}</h2>
          <h3 className="text-gray-500 text-sm">{sendTime}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
