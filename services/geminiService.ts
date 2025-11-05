import { GoogleGenAI } from "@google/genai";
import type { Tool } from '../types';
import { CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

// Calculate price for MVP form - uses same logic as AI suggester
export const calculatePrice = async (projectDescription: string): Promise<number> => {
  const trimmed = projectDescription.trim();
  
  if (!trimmed || trimmed.length < 10) {
    return 9; // Minimum price for invalid/too short descriptions
  }

  // Check for gibberish (all special characters or very few words)
  const wordCount = trimmed.split(/\s+/).filter(w => w.length > 0).length;
  const isGibberish = trimmed.length < 10 || 
                     /^[^a-zA-Z0-9\s]{5,}$/.test(trimmed) ||
                     (wordCount < 2 && trimmed.length < 20);
  
  if (isGibberish) {
    return 9;
  }

  // Use the SAME prompt structure as suggestTool for consistency
  const prompt = `
You are an expert AI workflow consultant. Analyze the following project description and calculate the price using the EXACT same method as when creating a workflow.

**User's Task:** "${trimmed}"

**Instructions:**
1. Analyze the task and break it down into logical steps (3-7 steps)
2. Estimate the time required for each step (in hours, be realistic and consistent)
3. Calculate TOTAL time range (minimum to maximum hours) by adding all step times
4. Calculate price using formula: (Average Hours × ₹20) - ₹1
   - Example: If time range is 8-12 hours, average is 10 hours, price = (10 × 20) - 1 = 199
   - Example: If time range is 4-6 hours, average is 5 hours, price = (5 × 20) - 1 = 99
   - Example: If time range is 20-25 hours, average is 22.5 hours, price = (22.5 × 20) - 1 = 449 (capped at 499)
5. IMPORTANT: Price must be between ₹9-₹499
   - If calculated price < ₹9, return ₹9
   - If calculated price > ₹499, return ₹499

**CRITICAL CONSISTENCY REQUIREMENTS:**
- For "create clothing app" or "create CLOTHING app", use the SAME time estimate as the AI tool suggester (typically 8-12 hours = ₹199)
- For similar tasks, provide consistent time estimates (within 1-2 hours range)
- Be realistic about complexity - a clothing app is a medium-complexity project

**Response Format:**
Return ONLY the price as a number (no currency symbol, no text, no explanation, just the number).

**Examples:**
- "create clothing app" → 199
- "create CLOTHING app" → 199
- "create a simple landing page" → 19
- "build an e-commerce platform with payment integration" → 399
- "create a website" → 99
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text.trim();
    
    // Extract the first number from response (most likely the price)
    // Try to find number that's between 9-499
    const numbers = responseText.match(/\d+/g);
    if (numbers) {
      for (const numStr of numbers) {
        const num = parseInt(numStr);
        if (num >= 9 && num <= 499) {
          return num;
        }
      }
      // If no number in range, use the first number and clamp it
      const firstNum = parseInt(numbers[0]);
      if (!isNaN(firstNum)) {
        if (firstNum < 9) return 9;
        if (firstNum > 499) return 499;
        return firstNum;
      }
    }

    // If no number found, check description for complexity clues
    const lowerDesc = trimmed.toLowerCase();
    if (lowerDesc.includes('simple') || lowerDesc.includes('basic')) {
      return 19;
    }
    if (lowerDesc.includes('clothing') || lowerDesc.includes('app') || lowerDesc.includes('ecommerce')) {
      return 199; // Default for app creation
    }
    if (lowerDesc.includes('platform') || lowerDesc.includes('complex')) {
      return 399;
    }
    
    // Default fallback based on length
    if (trimmed.length < 30) return 49;
    if (trimmed.length < 60) return 99;
    return 199;
  } catch (error) {
    console.error("Error calculating price:", error);
    // Fallback pricing based on description
    const lowerDesc = trimmed.toLowerCase();
    if (lowerDesc.includes('clothing') || lowerDesc.includes('app')) {
      return 199; // Consistent with AI suggester
    }
    if (trimmed.length < 30) return 49;
    if (trimmed.length < 60) return 99;
    return 199;
  }
};

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
7. Include estimated time for each step (in hours, be realistic and consistent)
8. Calculate TOTAL time range (minimum to maximum hours) by adding all step times
9. Calculate price as (Average Hours × ₹20) - ₹1 (always show -1)
10. IMPORTANT: Price must be between ₹9-₹499. If calculated price exceeds ₹499, cap it at ₹499
11. Suggest tips for getting the best results

**Format your response as follows:**

## 🎯 **AI Workflow for: [Task Summary]**

### ⏱️ **Total Estimated Time: [X-Y hours]**
### 💰 **Our Service Price: ₹[X-1]**
*Want to save time and effort? We'll do this for you! Create Your MVP →*

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
- For pricing: If time range is 8-12 hours, show ₹199 (average 10×20-1). If 4-6 hours, show ₹99 (average 5×20-1). Always subtract 1 from the total.
- PRICE CAP: Maximum price is ₹499, minimum is ₹9. Never exceed ₹499 even for complex projects.
- CONSISTENCY: For similar tasks like "create app", provide consistent time estimates (within 1-2 hours range).
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