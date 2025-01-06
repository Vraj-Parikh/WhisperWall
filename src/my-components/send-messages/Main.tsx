"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import SuggestMessages from "./SuggestMessages";
import SendMessage from "./SendMessage";
import CreateAccount from "./CreateAccount";

type MainProps = {
  userName: string;
};
const Main: NextPage<MainProps> = ({ userName }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="w-full">
      <h1 className="text-center font-bold">Public Profile Link</h1>
      <SendMessage userName={userName} suggestedMessage={message} />
      <SuggestMessages setMessage={setMessage} />
      <CreateAccount />
    </div>
  );
};

export default Main;
