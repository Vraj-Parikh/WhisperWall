"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import CustomButton from "../common/CustomButton";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { IMessage } from "@/model/Message";
import DashboardMessageCard from "./DashboardMessageCard";
const Dashboard = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isAcceptingMessage, setIsAcceptingMessage] = useState<boolean>(
    session?.user.isAcceptionMessages || true
  );
  let sendMessageLink = "";
  if (session?.user.name) {
    sendMessageLink = `${window.location.origin}/u/${session?.user.name}`;
  }
  useEffect(() => {
    const intialSetup = async () => {
      await fetchMessages();
      await intialSetUserAcceptingMessage();
    };
    intialSetup();
  }, []);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(sendMessageLink);
    toast({
      title: "Link Copied To Clipboard",
    });
  };
  async function fetchMessages() {
    try {
      setIsFetching(true);
      const API_URL = "/api/get-messages";
      const response = await axios.get<
        ApiResponse & { AllMessages: Array<IMessage> }
      >(API_URL);
      setMessages(response.data.AllMessages);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }
  async function intialSetUserAcceptingMessage() {
    try {
      const API_URL = "/api/accept-messages";
      const response = await axios.get<ApiResponse>(API_URL);
      if (response.data.success) {
        setIsAcceptingMessage(true);
      } else {
        setIsAcceptingMessage(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function toggleAcceptingMessage(checked: boolean) {
    try {
      const API_URL = "/api/accept-messages";
      await axios.post<ApiResponse>(API_URL, {
        isAcceptingMessage: checked,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsAcceptingMessage(checked);
    }
  }
  async function handleOnDeleteMessage(_id: string) {
    try {
      const userName = session?.user.name;
      if (!_id || !userName) {
        throw new Error("Could Not Delete Message");
      }
      const API_URL = "/api/delete-message";
      await axios.post(API_URL, { _id, userName });
      await fetchMessages();
      toast({
        title: "Message Deleted",
      });
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast({
        title: "Could Not Delete Message",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex-grow container mx-auto flex flex-col">
      <h1 className=" text-xl xxs:text-2xl md:text-3xl lg:text-4xl font-bold">
        User Dashboard
      </h1>
      <h2 className="text-sm sm:text-base xxs:font-bold mt-1">
        Copy Your Unique Link
      </h2>
      {sendMessageLink && (
        <div className="flex !items-stretch my-1 sm:my-2 md:my-3">
          <h2
            className="flex-grow bg-gray-300 text-black xxs:font-bold rounded-l-md border-t-0 text-xs xs:text-base justify-start items-center flex 
          px-2 md:px-4 tracking-wide sm:py-2"
          >
            {sendMessageLink}
          </h2>
          <div
            className="rounded-l-none flex justify-center items-center rounded-r-md px-2 sm:px-4 py-1 bg-black text-white text-xs xs:text-sm sm:text-base md:text-lg cursor-pointer"
            onClick={handleCopyLink}
          >
            <h1>Copy</h1>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 sm:my-1">
        <Switch
          id="accepting-messages"
          checked={isAcceptingMessage}
          onCheckedChange={toggleAcceptingMessage}
          className="scale-75 md:scale-90"
        />
        <Label htmlFor="accepting-messages">
          <h2
            className={`font-bold md:text-lg lg:text-xl ${isAcceptingMessage ? "text-green-600" : "text-red-500"}`}
          >
            {!isAcceptingMessage && "Not"} Accepting Message
          </h2>
        </Label>
      </div>
      <CustomButton
        className={`scale-75 sm:scale-90 md:scale-100 border !p-1.5 sm:!p-2 self-start mt-0 ${!isAcceptingMessage && "cursor-not-allowed"}`}
        variant={"ghost"}
        onClick={fetchMessages}
        disabled={!isAcceptingMessage || isFetching}
      >
        <RefreshCw
          strokeWidth={3}
          className={`${isFetching && "animate-spin"}`}
        />
      </CustomButton>
      <Separator className="my-1 sm:my-2 md:my-3 lg:my-4" />
      <div className="max-h-80 sm:max-h-96 overflow-y-auto">
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-5 md:grid-cols-2">
          {messages.map(({ content, createdAt, _id }) => (
            <DashboardMessageCard
              msg={content}
              sendDate={createdAt}
              key={_id}
              _id={_id ?? ""}
              handleOnDeleteMessage={handleOnDeleteMessage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
