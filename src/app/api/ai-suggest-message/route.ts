import SendResponseApi from "@/helpers/SendResponseApi";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  const prompt = `Create a list of three open-ended and
  engaging questions formatted as a single string. Each
  question should be separated by '||'. These questions are
  for an anonymous social messaging platform, like Qooh.me,
  and should be suitable for a diverse audience. Avoid
  personal or sensitive topics, focusing instead on
  universal themes that encourage friendly interaction. For
  example, your output should be structured like this:
  'What's a hobby you've recently started? || If you could
  have dinner with any historical figure, who would it be?||
  What's a simple thing that makes you happy?'. Ensure the
  questions are intriguing, foster curiosity, and
  contribute to a positive and welcoming conversational
  environment.`;
  try {
    // const { text } = await generateText({
    //   model: google("gemini-1.5-pro-latest"),
    //   prompt: prompt,
    //   maxTokens: 200,
    //   maxRetries:1
    // });
    // let suggestions = text.replace("\n", "").split("||");
    let suggestions = [
      "What's something you're learning or want to learn more about?",
      'If you could travel anywhere in the world right now, where would you go and why?',
      "What's a small act of kindness that's impacted you or someone you know?"
    ];
    return SendResponseApi(true, "Retrived Succesfully", 200, {
      suggestions
    });
  } catch (error: any) {
    return SendResponseApi(false, error?.message, 500);
  }
}
