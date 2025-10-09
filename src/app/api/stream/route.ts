import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid or missing prompt" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      prompt,
    });


    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error generating AI response:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while generating response",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
