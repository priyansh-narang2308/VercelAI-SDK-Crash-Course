"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { pokemonUISchema } from "@/app/api/structured-array/schema";

const StructuredArrayPage = () => {
  const [type, setType] = useState("");

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structured-array",
    schema: pokemonUISchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ type });
    setType("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white">
      <header className="text-center py-6 border-b border-white/10 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          ⚡ AI Pokémon Generator
        </h1>
        <p className="text-white/70 text-sm mt-1">
          Enter a Pokémon type to instantly generate a few matching Pokémon
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all">
          {!object?.length && !isLoading && (
            <p className="text-center text-white/50 italic">
              No Pokémon yet — try typing a type below 🔮
            </p>
          )}

          {isLoading && (
            <p className="text-center text-white/70 italic animate-pulse">
              Generating your Pokémon... please wait ✨
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {object?.map((pokemon, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <h2 className="text-xl font-bold text-white mb-3">
                  {pokemon?.name}
                </h2>

                <div className="space-y-1">
                  <h3 className="text-sm text-white/70 font-semibold">
                    Abilities:
                  </h3>
                  <ul className="list-disc list-inside text-white/80 text-sm">
                    {pokemon?.abilities?.map((ability, i) => (
                      <li key={i}>{ability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-zinc-950/90 border-t border-white/10 backdrop-blur-md px-4 sm:px-8 py-4 shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 shadow-md backdrop-blur-sm"
        >
          <Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type a Pokémon type (e.g. Fire, Water, Grass)"
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
              disabled={!type}
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

export default StructuredArrayPage;
