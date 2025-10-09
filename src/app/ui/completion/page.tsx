"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState(""); // AI response
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onComplete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setIsLoading(true);
    setPrompt("");
    setError(null);

    try {
      const resp = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setCompletion(data.text);
    } catch (error) {
      console.log(error);
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong! Please try again!";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen  p-8">
      <div className="flex flex-col w-full max-w-3xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Vercel AI SDK</h1>
          <p className="text-white/70 mt-2">
            Ask anything and get instant answers
          </p>
        </header>

        <div className="flex-1 overflow-y-auto bg-black border border-white/20 rounded-2xl p-6 shadow-inner flex flex-col gap-4">
          {error && (
            <div className="self-center bg-red-600 text-white px-4 py-2 rounded-2xl max-w-[90%] shadow">
              {error}
            </div>
          )}

          {!completion && !isLoading && !error && (
            <div className="text-white/50 text-center mt-10">
              Start the conversation below...
            </div>
          )}
          {isLoading && (
            <div className="self-start bg-white/10 text-transparent rounded-2xl w-64 h-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
              <style jsx>{`
                @keyframes shimmer {
                  100% {
                    transform: translateX(100%);
                  }
                }
              `}</style>
            </div>
          )}

          {completion && !isLoading && !error && (
            <div className="self-start bg-white text-black px-4 py-3 rounded-2xl max-w-[80%] break-words shadow">
              {completion}
            </div>
          )}
        </div>

        <form
          onSubmit={onComplete}
          className="flex items-center gap-4 mt-6 bg-black border border-white/20 rounded-2xl p-4 shadow-lg"
        >
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-black text-white placeholder-white/50 focus:ring-2 focus:ring-white rounded-xl py-4 px-4 border border-white/20"
          />
          <Button
            disabled={isLoading}
            variant={"default"}
            type="submit"
            className=" cursor-pointer px-6 py-4 rounded-xl active:scale-95 transition-all"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
