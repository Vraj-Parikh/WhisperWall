import React, { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton";
import Message from "./Message";
import { z } from "zod";
import { NextPage } from "next";

const responseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  suggestions: z.array(z.string()),
});
const fetchSuggestions = async () => {
  let messages: string[] = [];
  try {
    const API_URL = `${process.env.WEBSITE_URL || "http://192.168.1.3:3000"}/api/ai-suggest-message`;
    let response = await fetch(API_URL);
    response = await response.json();
    console.log(response);
    const { success, data } = responseSchema.safeParse(response);
    if (!success || !data) {
      console.log(data);
      throw new Error("Incorrect API data");
    }
    messages = data.suggestions;
  } catch (error: any) {
    console.error(error?.message);
  } finally {
    return messages;
  }
};
type SuggestMessagesProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};
const SuggestMessages: NextPage<SuggestMessagesProps> = ({ setMessage }) => {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const val = await fetchSuggestions();
      setData(val);
    })();
  }, []);
  if (!data || data.length === 0) {
    return <></>;
  }
  return (
    <div className="w-full">
      <CustomButton>Suggest Messages</CustomButton>
      <div className="">
        <h2>Click on any message below to select it</h2>
        <div className="border p-4 rounded-md">
          <h2>Messages</h2>
          <div className="space-y-2">
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
