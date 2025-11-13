import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { researchAgent } from "./research-agent";
import { contentGenerationWorkflow } from "../workflows/content-generation-workflow";

export const contentCreationAgent = new Agent({
  name: "Content Creation Agent",
  description:
    "This agent orchestrates content creation by first researching a topic, then generating polished content",
  instructions: `
    You are a content creation orchestrator. When a user requests content about a topic:
    
    1. First, delegate to the researchAgent to conduct research on the topic
    2. Then, use the contentGenerationWorkflow to create and polish the content based on the research findings
    
    Always explain what you're doing at each step. The research agent and workflow steps will show 
    progress updates as they work.
  `,
  model: "openai/gpt-4o-mini",
  agents: {
    researchAgent,
  },
  workflows: {
    contentGenerationWorkflow,
  },
  memory: new Memory(),
});

