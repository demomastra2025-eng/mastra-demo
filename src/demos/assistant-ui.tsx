import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

export const AssistantUIDemo = () => {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "http://localhost:4111/chat/ghibliAgent",
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid grid-cols-[200px_1fr] gap-x-2 px-4 py-4 size-full">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
