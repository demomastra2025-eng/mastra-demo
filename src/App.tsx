import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Sparkles, Bot, MessageSquare, type LucideIcon } from "lucide-react";
import { AISdkDemo } from "@/demos/ai-sdk";
import { CopilotKitDemo } from "@/demos/copilot-kit";
import { AssistantUIDemo } from "@/demos/assistant-ui";

type Framework = "aisdk" | "assistant-ui" | "copilot-kit";

type FrameworkEntry = {
  id: Framework;
  name: string;
  description: string;
  icon: LucideIcon;
};

const FRAMEWORKS: FrameworkEntry[] = [
  {
    id: "aisdk",
    name: "AI SDK",
    icon: Sparkles,
    description: "Built with Vercel's AI SDK and @mastra/ai-sdk",
  },
  {
    id: "assistant-ui",
    name: "Assistant UI",
    icon: Bot,
    description: "TODO",
  },
  {
    id: "copilot-kit",
    name: "Copilot Kit",
    icon: MessageSquare,
    description: "Built with Copilot Kit's Chat component",
  },
];

export default function Page() {
  const [activeFramework, setActiveFramework] = useState<Framework>("aisdk");

  const renderDemo = () => {
    switch (activeFramework) {
      case "aisdk":
        return <AISdkDemo />;
      case "copilot-kit":
        return <CopilotKitDemo />;
      case "assistant-ui":
        return <AssistantUIDemo />;
    }
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader>
            <div className="font-bold">UI Frameworks</div>
            <div className="text-sm text-sidebar-foreground/70">
              Choose an implementation
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Chat Examples</SidebarGroupLabel>
              <SidebarMenu>
                {FRAMEWORKS.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      className="hover:cursor-pointer"
                      onClick={() => setActiveFramework(item.id)}
                      isActive={item.id === activeFramework}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            This project demonstrates how you can use Mastra with different UI
            frameworks.
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <h1 className="font-bold text-xl">
                {FRAMEWORKS.find((item) => item.id === activeFramework)?.name}
              </h1>
            </div>
            <div>
              {
                FRAMEWORKS.find((item) => item.id === activeFramework)
                  ?.description
              }
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {renderDemo()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
