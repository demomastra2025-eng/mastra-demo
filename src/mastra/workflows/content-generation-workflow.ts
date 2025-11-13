import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

const draftCreation = createStep({
  id: "draft-creation",
  description: "Create an initial draft of the content",
  inputSchema: z.object({
    topic: z.string(),
    researchFindings: z.string(),
  }),
  outputSchema: z.object({
    draft: z.string(),
  }),
  execute: async ({ inputData, writer }) => {
    const { topic, researchFindings } = inputData!;

    // Emit custom event for draft creation start
    await writer?.write({
      type: "data-tool-progress",
      data: {
        status: "in-progress",
        message: `✍️ Creating draft for: ${topic}`,
        stage: "draft",
      },
    });

    // Simulate draft creation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await writer?.write({
      type: "data-tool-progress",
      data: {
        status: "in-progress",
        message: `📝 Writing content sections...`,
        stage: "draft",
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Emit done event
    await writer?.write({
      type: "data-tool-progress",
      data: {
        status: "done",
        message: `✅ Draft completed for: ${topic}`,
        stage: "draft",
      },
    });

    const draft = `# ${topic}

## Introduction
${researchFindings}

## Main Content
Based on the research conducted, this content provides a comprehensive overview of ${topic}. The draft includes key sections covering the most important aspects identified during the research phase.

## Key Points
- Point 1: Derived from research findings
- Point 2: Important insight from sources
- Point 3: Additional context and analysis

## Conclusion
This draft serves as the foundation for the final polished content.`;

    return {
      draft,
    };
  },
});

const reviewAndPolish = createStep({
  id: "review-and-polish",
  description: "Review and polish the draft content",
  inputSchema: z.object({
    draft: z.string(),
  }),
  outputSchema: z.object({
    finalContent: z.string(),
  }),
  execute: async ({ inputData, writer }) => {
    const { draft } = inputData!;

    // Emit custom event for review start
    await writer?.write({
      type: "data-tool-progress",
      data: {
        status: "in-progress",
        message: `🔍 Reviewing draft content...`,
        stage: "review",
      },
    });

    // Simulate review process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await writer?.write({
      type: "data-tool-progress",
      data: {
        status: "in-progress",
        message: `✨ Polishing and refining...`,
        stage: "review",
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Emit done event
    await writer?.write({
      type: "data-tool-progress",
      data: {
        status: "done",
        message: `✅ Content polished and ready!`,
        stage: "review",
      },
    });

    const finalContent = `${draft}

---
*This content has been reviewed, polished, and is ready for publication.*`;

    return {
      finalContent,
    };
  },
});

export const contentGenerationWorkflow = createWorkflow({
  id: "content-generation-workflow",
  description:
    "This workflow generates content by first creating a draft and then reviewing and polishing it",
  inputSchema: z.object({
    topic: z.string().describe("The topic for the content"),
    researchFindings: z.string().describe("Research findings to base the content on"),
  }),
  outputSchema: z.object({
    finalContent: z.string(),
  }),
})
  .then(draftCreation)
  .then(reviewAndPolish);

contentGenerationWorkflow.commit();

