import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";
import { MASTRA_BASE_URL } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, Search, FileText, Sparkles } from "lucide-react";

type ProgressData = {
  status: "in-progress" | "done";
  message: string;
  stage?: "research" | "draft" | "review";
};

const ProgressIndicator = ({
  progress,
}: {
  progress: ProgressData & { stage?: string };
}) => {
  if (!progress) return null;

  const getIcon = () => {
    switch (progress.stage) {
      case "research":
        return <Search className="w-5 h-5" />;
      case "draft":
        return <FileText className="w-5 h-5" />;
      case "review":
        return <Sparkles className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStageName = () => {
    switch (progress.stage) {
      case "research":
        return "Research";
      case "draft":
        return "Draft Creation";
      case "review":
        return "Review & Polish";
      default:
        return "Processing";
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border-l-4 border-l-blue-500">
      <div className="flex items-center gap-2">
        {progress.status === "in-progress" ? (
          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        )}
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-semibold text-sm text-muted-foreground">
            {getStageName()}
          </div>
          <Badge
            variant={progress.status === "in-progress" ? "default" : "secondary"}
            className="text-xs"
          >
            {progress.status === "in-progress" ? "In Progress" : "Done"}
          </Badge>
        </div>
        <div className="font-medium text-sm">{progress.message}</div>
      </div>
    </div>
  );
};

export const SubAgentsAndWorkflowsCustomEventsDemo = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${MASTRA_BASE_URL}/chat/contentCreationAgent`,
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  // Collect all progress events grouped by stage
  const progressEvents = useMemo(() => {
    const events: Array<ProgressData & { stage?: string }> = [];
    messages.forEach((message) => {
      message.parts.forEach((part) => {
        if (part.type === "data-tool-progress") {
          const data = (part.data || {}) as ProgressData;
          if (data) {
            events.push(data);
          }
        }
      });
    });
    return events;
  }, [messages]);

  // Get the latest event for each stage
  const latestByStage = useMemo(() => {
    const byStage: Record<string, ProgressData & { stage?: string }> = {};
    progressEvents.forEach((event) => {
      if (event.stage) {
        // Only keep the latest event for each stage
        if (!byStage[event.stage] || event.status === "done") {
          byStage[event.stage] = event;
        }
      }
    });
    return byStage;
  }, [progressEvents]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-4 items-center"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a topic for content creation (e.g., 'Artificial Intelligence', 'Climate Change')"
          />
          <Button type="submit" disabled={status !== "ready"}>
            Create Content
          </Button>
        </form>
      </div>
      <div className="space-y-4">
        {messages.map((message, idx) => (
          <div key={message.id}>
            <div>
              {message.parts.map((part, index) => {
                if (part.type === "text" && message.role === "user") {
                  return (
                    <Message key={index} from={message.role}>
                      <MessageContent>
                        <Response>{part.text}</Response>
                      </MessageContent>
                    </Message>
                  );
                }

                if (part.type === "text" && message.role === "assistant") {
                  return (
                    <Message key={index} from={message.role}>
                      <MessageContent>
                        <Response>{part.text}</Response>
                      </MessageContent>
                    </Message>
                  );
                }

                return null;
              })}
            </div>
            {/* Show progress indicators for the latest message */}
            {idx === messages.length - 1 && Object.keys(latestByStage).length > 0 && (
              <div className="my-4 space-y-2">
                {Object.entries(latestByStage)
                  .sort(([a], [b]) => {
                    // Order: research -> draft -> review
                    const order = { research: 0, draft: 1, review: 2 };
                    return (order[a as keyof typeof order] ?? 99) - (order[b as keyof typeof order] ?? 99);
                  })
                  .map(([stage, event]) => (
                    <ProgressIndicator key={stage} progress={event} />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

