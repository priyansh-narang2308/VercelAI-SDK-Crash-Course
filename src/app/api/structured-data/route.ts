import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a proper recipe for ${dish}`,
      schema: recipeSchema,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log("Erro rgenerating recipe: ", error);
    return new Response("Failed to generate a recipe", { status: 500 });
  }
}
