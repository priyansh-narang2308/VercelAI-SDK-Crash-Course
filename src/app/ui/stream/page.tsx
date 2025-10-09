"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompletion } from "@ai-sdk/react";

const StreamingText = () => {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    setInput,
    error,
    stop,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="flex justify-center h-screen bg-black p-8">
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
              {error.message}
            </div>
          )}

          {isLoading ? (
            <div className="self-start bg-white/10 text-transparent rounded-2xl w-64 h-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : completion ? (
            <div className="self-start bg-white text-black px-4 py-3 rounded-2xl max-w-[80%] break-words shadow">
              {completion}
            </div>
          ) : null}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setInput("");
          }}
          className="flex items-center gap-4 mt-6 bg-black border border-white/20 rounded-2xl p-4 shadow-lg"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 bg-black text-white placeholder-white/50 focus:ring-2 focus:ring-white rounded-xl py-4 px-4 border border-white/20"
          />

          {isLoading ? (
            <Button
              type="button"
              onClick={stop}
              className="cursor-pointer px-6 py-4 rounded-xl active:scale-95 transition-all bg-red-600 text-white hover:bg-red-500"
            >
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              className="cursor-pointer px-6 py-4 rounded-xl active:scale-95 transition-all bg-white text-black hover:bg-white/80"
            >
              Send
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default StreamingText;
