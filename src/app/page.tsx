"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Sparkles, Zap, Cpu, Brain, ArrowRight } from "lucide-react";

const routes = [
  {
    name: "API Tool",
    path: "/ui/api-tool",
    description: "External API integration and custom tool calling",
    icon: "🔧",
    category: "Tools",
  },
  {
    name: "Chat",
    path: "/ui/chat-history",
    description: "Conversational AI with persistent chat history",
    icon: "💬",
    category: "Chat",
  },
  {
    name: "Client Side Tools",
    path: "/ui/client-side-tools",
    description: "Browser-based tools and client-side execution",
    icon: "🛠️",
    category: "Tools",
  },
  {
    name: "Completion",
    path: "/ui/completion",
    description: "Text generation and AI completion endpoints",
    icon: "⚡",
    category: "Core",
  },
  {
    name: "Generate Image Tool",
    path: "/ui/generate-image-tool",
    description: "AI-powered image generation interface",
    icon: "🎨",
    category: "Vision",
  },
  {
    name: "Generate Image",
    path: "/ui/generate-image",
    description: "Text-to-image synthesis and creation",
    icon: "🖼️",
    category: "Vision",
  },
  {
    name: "Generate Speech",
    path: "/ui/generate-speech",
    description: "Text-to-speech synthesis and audio generation",
    icon: "🔊",
    category: "Audio",
  },
  {
    name: "MCP Tools",
    path: "/ui/mcp-tools",
    description: "Model Context Protocol tools and extensions",
    icon: "🔗",
    category: "Tools",
  },
  {
    name: "Message Metadata",
    path: "/ui/message-metadata",
    description: "Message analytics and conversation insights",
    icon: "📊",
    category: "Data",
  },
  {
    name: "Multi Modal Chat",
    path: "/ui/multi-modal-chat",
    description: "Multi-modal conversations with text and images",
    icon: "👁️",
    category: "Vision",
  },
  {
    name: "Multiple Tools",
    path: "/ui/multiple-tools",
    description: "Sequential and parallel tool execution",
    icon: "🔄",
    category: "Tools",
  },
  {
    name: "Provider Management",
    path: "/ui/provider-management",
    description: "AI provider configuration and model settings",
    icon: "🏢",
    category: "Core",
  },
  {
    name: "Reasoning",
    path: "/ui/reasoning",
    description: "Advanced reasoning and chain-of-thought capabilities",
    icon: "🧠",
    category: "AI",
  },
  {
    name: "Stream",
    path: "/ui/stream",
    description: "Real-time streaming responses and tokens",
    icon: "🌊",
    category: "Core",
  },
  {
    name: "Structured Array",
    path: "/ui/structured-array",
    description: "Array-based structured output generation",
    icon: "📋",
    category: "Data",
  },
  {
    name: "Structured Data",
    path: "/ui/structured-data",
    description: "Structured JSON output and data validation",
    icon: "🗂️",
    category: "Data",
  },
  {
    name: "Tools",
    path: "/ui/tools",
    description: "AI tool definitions and function calling",
    icon: "⚙️",
    category: "Tools",
  },
  {
    name: "Transcribe Audio",
    path: "/ui/transcribe-audio",
    description: "Speech-to-text transcription and audio processing",
    icon: "🎵",
    category: "Audio",
  },
  {
    name: "Web Search Tool",
    path: "/ui/web-search-tool",
    description: "Real-time web search and information retrieval",
    icon: "🌐",
    category: "Tools",
  },
];

const categories = [...new Set(routes.map((route) => route.category))];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredRoutes =
    selectedCategory === "All"
      ? routes
      : routes.filter((route) => route.category === selectedCategory);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-5 animate-pulse delay-500"></div>
      </div>

      <header className="relative border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-white animate-spin" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  Vercel AI SDK
                </h1>
                <p className="text-gray-400 mt-2 text-lg">
                  Premium Interactive AI Examples & Tools
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {routes.length}
                </div>
                <div className="text-gray-400 text-sm">Examples</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {categories.length}
                </div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">
              Next Generation AI Development
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Explore AI Capabilities
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dive into {routes.length} meticulously crafted examples showcasing
            the full power of Vercel AI SDK. From multi-modal chat to advanced
            tool calling.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-3 rounded-full border transition-all duration-300 ${
              selectedCategory === "All"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/20 hover:border-white/40"
            }`}
          >
            All Examples
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/20 hover:border-white/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRoutes.map((route, index) => (
            <Link key={route.path} href={route.path}>
              <Card
                className="relative h-full bg-black border-2 border-white/10 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    hoveredCard === index ? "opacity-100" : ""
                  }`}
                ></div>

                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white via-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    padding: "2px",
                  }}
                ></div>

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {route.icon}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border-0"
                    >
                      {route.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-gray-300 transition-colors duration-300 flex items-center gap-2">
                    {route.name}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm leading-relaxed">
                    {route.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md font-mono">
                      {route.path}
                    </code>
                    <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </CardContent>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-16">
            <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              No examples found
            </h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </main>

      <footer className="relative border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="font-semibold">Vercel AI SDK Crash Course</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Premium Black & White Experience</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
