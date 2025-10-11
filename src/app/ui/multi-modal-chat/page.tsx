"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useState } from "react";
import { Upload, Send, StopCircle } from "lucide-react";

const MultiModalChat = () => {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);

  const { messages, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/multi-modal-chat",
    }),
  });

  return (
    <div className="flex justify-center bg-black h-screen p-6 text-white">
      <div className="flex flex-col w-full max-w-3xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold">Vercel AI SDK</h1>
          <p className="text-white/70 mt-2">
            Ask anything and get instant answers
          </p>
        </header>

        {error && (
          <div className="bg-red-600/20 text-red-400 border border-red-600/40 rounded-xl p-3 text-sm mb-4 text-center">
            {error.message}
          </div>
        )}

        <div className="flex-1 overflow-y-auto bg-black border border-white/20 rounded-2xl p-6 shadow-inner flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="text-white/50 text-center mt-10">
              Start the conversation below...
            </div>
          )}

          {messages.map((mess) => (
            <div key={mess.id} className="flex flex-col gap-1">
              <div
                className={`text-xs ${
                  mess.role === "user"
                    ? "self-end text-white/60"
                    : "self-start text-white/60"
                }`}
              >
                {mess.role === "user" ? "You" : "AI"}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] break-words shadow-md ${
                  mess.role === "user"
                    ? "self-end bg-white text-black rounded-br-none"
                    : "self-start bg-white/10 text-white rounded-bl-none border border-white/20"
                }`}
              >
                {mess.parts.map((part, index) =>
                  part.type === "text" ? (
                    <p
                      key={`${mess.id}-${index}`}
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                    >
                      {part.text}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          ))}

          {(status === "submitted" || status === "streaming") && (
            <div className="flex flex-col gap-1 self-start">
              <div className="text-xs text-white/60">AI:</div>
              <div className="bg-white/10 text-white px-4 py-3 rounded-2xl rounded-bl-none border border-white/20 flex items-center gap-2 w-fit">
                <div className="flex gap-1 animate-pulse">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  <span className="w-2 h-2 bg-white/60 rounded-full delay-150"></span>
                  <span className="w-2 h-2 bg-white/60 rounded-full delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form className="flex items-center gap-3 mt-6 bg-black border border-white/20 rounded-2xl p-4 shadow-lg">
          <div className="relative">
            <input
              type="file"
              multiple
              ref={fileRef}
              onChange={(e) => setFiles(e.target.files || undefined)}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="bg-white/10 cursor-pointer hover:bg-white/20 border border-white/20 rounded-xl p-3"
            >
              <Upload className="w-5 h-5 text-white" />
            </Button>
          </div>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-black text-white placeholder-white/50 focus:ring-2 focus:ring-white rounded-xl py-4 px-4 border border-white/20"
          />

          {status === "submitted" || status === "streaming" ? (
            <Button
              onClick={stop}
              type="button"
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              <StopCircle className="w-5 h-5" /> Stop
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={status !== "ready"}
              className="bg-white cursor-pointer text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-5 h-5" /> Send
            </Button>
          )}
        </form>

        {files && files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-white/80">
            {Array.from(files).map((file, i) => (
              <div
                key={i}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs"
              >
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiModalChat;
