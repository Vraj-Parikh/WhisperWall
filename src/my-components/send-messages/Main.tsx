"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import SuggestMessages from "./SuggestMessages";
import SendMessage from "./SendMessage";
import CreateAccount from "./CreateAccount";
import { useSession } from "next-auth/react";

type MainProps = {
  userName: string;
};
const Main: NextPage<MainProps> = ({ userName }) => {
  const [message, setMessage] = useState("");
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  return (
    <div className="w-full">
      <h1 className="text-center text-xl xxs:text-2xl md:text-3xl lg:text-4xl font-bold">
        Public Profile Link
      </h1>
      <div className="mb-4"></div>
      <SendMessage userName={userName} suggestedMessage={message} />
      <div className="mb-6"></div>
      <SuggestMessages setMessage={setMessage} />
      <div className="mb-4 md:mb-6 lg:mb-8"></div>
      {!isLoggedIn && <CreateAccount />}
    </div>
  );
};

export default Main;
