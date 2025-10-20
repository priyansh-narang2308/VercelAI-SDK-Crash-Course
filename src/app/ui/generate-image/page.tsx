"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const GenerateImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setImageSrc(null);
    setPrompt("");
    setError(null);

    try {
      const resp = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const { data } = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setImageSrc(`data:image/png;base64,${data}`);
    } catch (error) {
      console.error("Error generating image: ", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="self-start bg-white/10 text-transparent rounded-2xl w-64 h-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : imageSrc ? (
            <Image
              alt="image"
              src={imageSrc}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              width={1024}
              height={1024}
            />
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mt-6 bg-black border border-white/20 rounded-2xl p-4 shadow-lg"
        >
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image..."
            className="flex-1 bg-black text-white placeholder-white/50 focus:ring-2 focus:ring-white rounded-xl py-4 px-4 border border-white/20"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer px-6 py-4 rounded-xl active:scale-95 transition-all bg-white text-black hover:bg-white/80"
          >
            Generate Image
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GenerateImagePage;
