"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structured-data/schema";

const StructuredData = () => {
  const [dishName, setDishName] = useState("");

  const { submit } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ dish: dishName });
    setDishName("");
  };

  return (
    <div className="flex justify-center h-screen bg-black p-8">
      <div className="flex flex-col w-full max-w-3xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">
            Food Recipe Agent using Vercel AI SDK
          </h1>
          <p className="text-white/70 mt-2">
            Ask anything and get instant answers
          </p>
        </header>

        <div className="flex-1 overflow-y-auto bg-black border border-white/20 rounded-2xl p-6 shadow-inner flex flex-col gap-4"></div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mt-6 bg-black border border-white/20 rounded-2xl p-4 shadow-lg"
        >
          <Input
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter a Dish Name..."
            className="flex-1 bg-black text-white placeholder-white/50 focus:ring-2 focus:ring-white rounded-xl py-4 px-4 border border-white/20"
          />

          <Button
            type="submit"
            className="cursor-pointer px-6 py-4 rounded-xl active:scale-95 transition-all bg-white text-black hover:bg-white/80"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StructuredData;
