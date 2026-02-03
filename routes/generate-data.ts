import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "langchain";
import z from "zod";
import { PromptSchema } from "../types/types";
import { SYSTEM_PROMPT } from "../lib/system-prompt";

export const generateData = async (req: Request) => {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  });

  let userPrompt;

  try {
    const body = await req.json();
    const validData = PromptSchema.safeParse(body);
    userPrompt = validData.data?.prompt!;

    if (!validData.success) {
      return new Response(
        JSON.stringify({
          success: false,
          data: {
            error: validData.error,
          },
        }),
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        data: {
          error: error.message,
        },
      }),
    );
  }

  const systemPrompt = new SystemMessage(SYSTEM_PROMPT);

  const humanPrompt = new HumanMessage(userPrompt);

  const res = await model.invoke([systemPrompt, humanPrompt]);

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        prompt: userPrompt,
        response: res.content,
      },
    }),
  );
};
