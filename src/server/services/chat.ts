import OpenAI from "openai";
import 'dotenv/config';

const openAi = new OpenAI();

interface ChatMessage {
  role: string;
  content: string | null;
}

async function newMessage(history: any[], message: any): Promise<ChatMessage> {
  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an HR assistant. You are helping a tech human resource professional to hire candidates.",
      },
      ...history,
      message
    ],
  });

  return response.choices[0].message ;
}

let chatHistory: ChatMessage[] = []

export async function getChatResponse(userMessage: string): Promise<ChatMessage[]> {
  const formattedMessage = { role: "user", content: userMessage }
  const chatResponse = await newMessage(chatHistory, formattedMessage)

  if(userMessage === "reset") {
    chatHistory = [];
    return chatHistory;
  }

  chatHistory.push(formattedMessage, chatResponse)

  return chatHistory;
}
