import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import Message from "./Message";
import { NextPage } from "next";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { LoaderCircle } from "lucide-react";

const fetchSuggestions = async () => {
  let messages: string[] = [];
  try {
    const API_URL = `/api/ai-suggest-message`;
    const response = await axios.get<ApiResponse & { suggestions: string[] }>(
      API_URL
    );
    const { success, suggestions } = response.data;
    if (!success || !suggestions || suggestions.length === 0) {
      throw new Error("Could Not Fetch Data");
    }
    messages = suggestions;
  } catch (error: any) {
    console.error(error);
  } finally {
    return messages;
  }
};
type SuggestMessagesProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const intialSuggestions = [
  "What's something you're learning or want to learn more about?",
  "If you could travel anywhere in the world right now, where would you go and why?",
  "What's a small act of kindness that's impacted you or someone you know?",
];
const SuggestMessages: NextPage<SuggestMessagesProps> = ({ setMessage }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<string[]>(intialSuggestions);
  const handleOnSuggestMessages = async () => {
    setIsFetching(true);
    const val = await fetchSuggestions();
    console.log(val);
    setData(val);
    setIsFetching(false);
  };
  if (!data || data.length === 0) {
    return <></>;
  }
  return (
    <div className="w-full">
      <CustomButton
        className={`tracking-wide xs:font-bold ${isFetching && "cursor-not-allowed"}`}
        onClick={handleOnSuggestMessages}
        disabled={isFetching}
      >
        {isFetching ? (
          <div className="flex gap-2 justify-center items-center">
            <LoaderCircle color="#fff" className="animate-spin" />
            <h4 className="text-white">Fetching</h4>
          </div>
        ) : (
          "Suggest Messages"
        )}
      </CustomButton>
      <div className="mt-3 space-y-2">
        <h2 className="text-sm xs:text-base sm:text-lg font-semibold">
          Click on any message below to select it
        </h2>
        <div className="border p-4 rounded-md space-y-2 lg:space-y-3">
          <h2 className="text-sm font-semibold xs:text-base sm:text-lg sm:tracking-wide">
            Messages
          </h2>
          <div className="space-y-2 lg:space-y-3">
            {data.map((msg) => (
              <Message
                key={msg}
                msg={msg.trim()}
                onClick={() => setMessage(msg.trim())}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestMessages;
