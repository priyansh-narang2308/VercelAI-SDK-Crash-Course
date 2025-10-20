import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const routes = [
  {
    name: "API Tool",
    path: "/ui/api-tool",
    description: "API tool functionality",
  },
  {
    name: "Chat",
    path: "/ui/chat-history",
    description: "Add loading spinner",
  },
  {
    name: "Client Side Tools",
    path: "/ui/client-side-tools",
    description: "Update tr param",
  },
  {
    name: "Completion",
    path: "/ui/completion",
    description: "Update error handling",
  },
  {
    name: "Generate Image Tool",
    path: "/ui/generate-image-tool",
    description: "Handle TS error",
  },
  {
    name: "Generate Image",
    path: "/ui/generate-image",
    description: "Generate image",
  },
  {
    name: "Generate Speech",
    path: "/ui/generate-speech",
    description: "Update TTS",
  },
  { name: "MCP Tools", path: "/ui/mcp-tools", description: "MCP tools" },
  {
    name: "Message Metadata",
    path: "/ui/message-metadata",
    description: "Message metadata",
  },
  {
    name: "Multi Modal Chat",
    path: "/ui/multi-modal-chat",
    description: "Handle null return",
  },
  {
    name: "Multiple Tools",
    path: "/ui/multiple-tools",
    description: "Multiple tool calls",
  },
  {
    name: "Provider Management",
    path: "/ui/provider-management",
    description: "Provider and Model Management",
  },
  { name: "Reasoning", path: "/ui/reasoning", description: "Reasoning" },
  { name: "Stream", path: "/ui/stream", description: "Streaming completions" },
  {
    name: "Structured Array",
    path: "/ui/structured-array",
    description: "Structured array",
  },
  {
    name: "Structured Data",
    path: "/ui/structured-data",
    description: "Structured objects",
  },
  { name: "Tools", path: "/ui/tools", description: "Update name" },
  {
    name: "Transcribe Audio",
    path: "/ui/transcribe-audio",
    description: "Update to file",
  },
  {
    name: "Web Search Tool",
    path: "/ui/web-search-tool",
    description: "Update JSX",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Vercel AI SDK
              </h1>
              <p className="text-muted-foreground mt-2">
                Interactive examples and tools for AI development
              </p>
            </div>
            <Badge variant="secondary" className="w-fit">
              {routes.length} Examples
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">AI SDK Examples</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore various AI capabilities and tools built with Vercel AI SDK.
            Click on any card to navigate to the specific example.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <Link key={route.path} href={route.path} className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 border-2 group-hover:border-foreground/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium group-hover:text-foreground/80 transition-colors">
                      {route.name}
                    </CardTitle>
                    <div className="w-2 h-2 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {route.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      {route.path}
                    </span>
                    <Badge variant="outline" className="ml-2">
                      #{String(index + 1).padStart(2, "0")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Vercel AI SDK Crash Course</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
