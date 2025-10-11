import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a list of 5 ${type} type of pokemon`,
      output: "array", //!INFO:THIS IS THE MAIN CHANGE
      schema: pokemonSchema,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log("Erro rgenerating recipe: ", error);
    return new Response("Failed to generate a recipe", { status: 500 });
  }
}
