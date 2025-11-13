import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { researchTool } from "../tools/research-tool";

export const researchAgent = new Agent({
  name: "Research Agent",
  description: "This agent conducts research on topics and provides findings",
  instructions: `
    You are a research assistant. When given a topic, use the conduct-research tool 
    to gather information and provide comprehensive findings. The tool will show 
    progress updates as it works.
  `,
  model: "openai/gpt-4o-mini",
  tools: { researchTool },
  memory: new Memory(),
});

