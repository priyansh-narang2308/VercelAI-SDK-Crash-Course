"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structured-data/schema";

const StructuredData = () => {
  const [dishName, setDishName] = useState("");

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ dish: dishName });
    setDishName("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white">
      <header className="text-center py-6 border-b border-white/10 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          🍽️ AI Recipe Generator
        </h1>
        <p className="text-white/70 text-sm mt-1">
          Enter a dish name to get ingredients and step-by-step instructions
          instantly.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all">
          {!object?.recipe && !isLoading && (
            <p className="text-center text-white/50 italic">
              No recipe yet — try typing a dish below 🍜
            </p>
          )}

          {isLoading && (
            <p className="text-center text-white/70 italic animate-pulse">
              Generating your recipe... please wait ✨
            </p>
          )}

          {object?.recipe && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {object.recipe.name}
                </h2>
                <div className="h-[1px] bg-white/10 mb-4" />
              </div>

              {object.recipe.ingredients && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white/90">
                    🧂 Ingredients
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {object.recipe.ingredients.map((ing, index) => (
                      <li
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 flex justify-between"
                      >
                        <span>{ing?.name}</span>
                        <span className="text-white/60">{ing?.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {object.recipe.steps && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white/90">
                    👨‍🍳 Steps
                  </h3>
                  <ol className="space-y-2">
                    {object.recipe.steps.map((step, index) => (
                      <li
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/90 leading-relaxed"
                      >
                        <span className="text-white/60 mr-2">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-zinc-950/90 border-t border-white/10 backdrop-blur-md px-4 sm:px-8 py-4 shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 shadow-md backdrop-blur-sm"
        >
          <Input
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Type a dish name (e.g., Paneer Butter Masala)..."
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 border-none outline-none py-4 text-sm"
          />

          {isLoading ? (
            <Button
              type="button"
              onClick={stop}
              className="px-6 py-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 active:scale-95 transition-all cursor-pointer"
            >
              Stop
            </Button>
          ) : (
            <Button
              disabled={!dishName}
              type="submit"
              className="px-6 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/80 active:scale-95 transition-all cursor-pointer"
            >
              Generate
            </Button>
          )}
        </form>

        {error && (
          <p className="text-red-400 text-center text-sm italic mt-2">
            ⚠️ Something went wrong — please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default StructuredData;
