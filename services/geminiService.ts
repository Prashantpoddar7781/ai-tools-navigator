import { GoogleGenAI } from "@google/genai";
import type { Tool } from '../types';
import { CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const suggestTool = async (taskDescription: string, allTools: Tool[]): Promise<string> => {
  // Create a more structured tool list with categories
  const toolList = allTools.map(tool => {
    const category = CATEGORIES.find(cat => 
      cat.subCategories.some(sub => sub.tools.includes(tool))
    );
    const subCategory = category?.subCategories.find(sub => 
      sub.tools.includes(tool)
    );
    return `- **${tool.name}** (${category?.name} > ${subCategory?.name}): ${tool.description}`;
  }).join('\n');

  const prompt = `
You are an expert AI workflow consultant specializing in creating comprehensive, step-by-step workflows for complex tasks using AI tools.

**User's Task:** "${taskDescription}"

**Your Mission:** Create a detailed, sequential workflow that breaks down this task into logical steps, recommending the best AI tool for each step from the available tools below.

**Instructions:**
1. Analyze the task and break it down into 3-7 logical steps
2. For each step, recommend the BEST tool from the list below
3. Explain WHY that specific tool is perfect for that step
4. Include alternative tools if the primary choice isn't available
5. Consider the logical flow - some steps must come before others
6. Mention any prerequisites or preparation needed
7. Include estimated time for each step (in hours, be realistic)
8. Calculate TOTAL time by adding all step times
9. Calculate price as (Total Hours × ₹20) - ₹1 (always show -1)
10. Suggest tips for getting the best results

**Format your response as follows:**

## 🎯 **AI Workflow for: [Task Summary]**

### ⏱️ **Total Estimated Time: [X hours]**
### 💰 **Our Service Price: ₹[X-1] (₹20/hour)**
*Want to save time and effort? We'll do this for you! [Create Your MVP →](/mvp)*

### **Step 1: [Step Name]**
**Tool:** [Tool Name] (Category: [Category Name])
**Why:** [Detailed explanation of why this tool is perfect for this step]
**Time:** [Estimated time]
**Tips:** [Specific tips for best results]

### **Step 2: [Step Name]**
**Tool:** [Tool Name] (Category: [Category Name])
**Why:** [Detailed explanation]
**Time:** [Estimated time]
**Tips:** [Specific tips]

[Continue for all steps...]

### **🔄 Alternative Workflow** (if applicable)
[If there are multiple valid approaches, suggest an alternative]

### **💡 Pro Tips**
- [General tips for the entire workflow]
- [Common pitfalls to avoid]
- [How to optimize results]

**Available Tools:**
${toolList}

**Important:** 
- Be specific about tool names and explain your reasoning clearly
- Focus on creating a practical, actionable workflow that the user can follow step-by-step
- For pricing: If total time is 10 hours, show ₹199 (10×20-1). If 5 hours, show ₹99 (5×20-1). Always subtract 1 from the total.
- Make the time estimates realistic - consider complexity and learning curve
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