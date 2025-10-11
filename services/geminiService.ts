import { GoogleGenAI } from "@google/genai";
import type { Tool } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const suggestTool = async (taskDescription: string, allTools: Tool[]): Promise<string> => {
  const toolList = allTools.map(tool => `- ${tool.name}: ${tool.description}`).join('\n');

  const prompt = `
You are an expert AI workflow consultant. A user needs to accomplish a complex task and wants a recommended sequence of AI tools to use.

User's Task: "${taskDescription}"

Based on this task, analyze the following list of available tools. Recommend a complete workflow or sequence of tools that would help the user accomplish their goal from start to finish.

- For each step in the workflow, recommend a specific tool from the list.
- Explain WHY you are recommending that tool for that specific step.
- Present the workflow as a series of numbered steps in markdown format.
- If a single tool can handle multiple steps, mention that.
- If no perfect tool exists for a step, suggest the closest alternative and explain its limitations.

Available Tools:
${toolList}

Your recommendation should be formatted in simple markdown. Start with a headline like "### Recommended AI Workflow".
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while trying to suggest a tool. Please check the console for details.";
  }
};