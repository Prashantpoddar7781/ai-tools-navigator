import { GoogleGenAI } from "@google/genai";
import type { Tool } from '../types';
import { CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

// Calculate price for MVP form - uses same logic as AI suggester
export const calculatePrice = async (projectDescription: string): Promise<number> => {
  if (!projectDescription.trim() || projectDescription.length < 10) {
    return 9; // Minimum price for invalid/too short descriptions
  }

  const prompt = `
You are an expert project estimator. Analyze the following project description and calculate the price using the EXACT same logic as our AI tool suggester.

**Project Description:** "${projectDescription}"

**Instructions:**
1. Analyze the complexity and scope of the project - break it down into logical steps (3-7 steps)
2. Estimate the time required for each step (in hours, be realistic)
3. Calculate TOTAL time range (minimum to maximum hours) by adding all step times
4. Calculate price using formula: (Average Hours × ₹20) - ₹1
   - Example: If time range is 8-12 hours, average is 10 hours, price = (10 × 20) - 1 = 199
   - Example: If time range is 4-6 hours, average is 5 hours, price = (5 × 20) - 1 = 99
5. IMPORTANT: Price must be between ₹9-₹499
   - If calculated price < ₹9, return ₹9
   - If calculated price > ₹499, return ₹499
6. For random/gibberish text like "vdvcdvhcdhb", return ₹9 (minimum)
7. For very simple projects (1-2 hours), return ₹9-₹19
8. For medium projects (3-5 hours), return ₹59-₹99
9. For complex projects (6-10 hours), return ₹119-₹199
10. For very complex projects (11+ hours), return ₹219-₹499 (capped at ₹499)

**CRITICAL: Consistency**
- For similar tasks, provide consistent time estimates (within 1-2 hours range)
- "create clothing app" should return the SAME price as if entered in AI tool suggester
- "create CLOTHING app" should return the SAME price as "create clothing app"

**Response Format:**
Return ONLY the price as a number (no currency symbol, no text, just the number).

**Examples:**
- "create a simple landing page" → 19
- "create a clothing app" → 199 (same as AI suggester)
- "create CLOTHING app" → 199 (same as above)
- "build an e-commerce platform with payment" → 399
- "vdvcdvhcdhb" (gibberish) → 9
- "create a website" → 99
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text.trim();
    
    // Extract number from response (handle cases where AI returns text)
    const priceMatch = responseText.match(/\d+/);
    if (priceMatch) {
      let price = parseInt(priceMatch[0]);
      
      // Ensure price is within bounds
      if (price < 9) price = 9;
      if (price > 499) price = 499;
      
      return price;
    }

    // Fallback: check if description is gibberish (very short or random characters)
    const isGibberish = projectDescription.length < 10 || 
                       /^[^a-zA-Z0-9\s]{5,}$/.test(projectDescription) ||
                       projectDescription.split(' ').length < 2;
    
    return isGibberish ? 9 : 99; // Default to ₹99 for valid descriptions that failed parsing
  } catch (error) {
    console.error("Error calculating price:", error);
    // Fallback pricing based on description length
    const descLength = projectDescription.length;
    if (descLength < 20) return 9;
    if (descLength < 50) return 49;
    if (descLength < 100) return 99;
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