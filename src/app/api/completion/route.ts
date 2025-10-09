import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return new Response(
      JSON.stringify({ error: message }),
      { status: 500 }
    );
  }
}
