import { GoogleGenAI } from "@google/genai";
import type { Tool } from '../types';
import { CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

// Calculate price for MVP form - uses EXACT same logic as AI suggester by calling suggestTool
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

  try {
    // Import allTools here to avoid circular dependency
    const allTools = CATEGORIES.flatMap(cat => 
      cat.subCategories.flatMap(sub => sub.tools)
    );
    
    // Call the EXACT same function as AI suggester
    const responseText = await suggestTool(trimmed, allTools);
    
    // Extract price from response using the same format as AI suggester
    // Format: "### 💰 **Our Service Price: ₹[number]**"
    // Try multiple patterns to catch all variations
    let priceMatch = responseText.match(/\*\*Our Service Price:\*\*\s*₹?(\d+)/i);
    if (!priceMatch) {
      priceMatch = responseText.match(/Our Service Price[:\s]*₹?(\d+)/i);
    }
    if (!priceMatch) {
      priceMatch = responseText.match(/Service Price[:\s]*₹?(\d+)/i);
    }
    if (!priceMatch) {
      priceMatch = responseText.match(/💰[^\d]*₹?(\d+)/i);
    }
    
    if (priceMatch && priceMatch[1]) {
      const price = parseInt(priceMatch[1]);
      if (!isNaN(price) && price >= 9 && price <= 499) {
        console.log(`✅ Extracted price from suggestTool: ₹${price} for "${trimmed}"`);
        return price;
      }
    }
    
    // Fallback: find any number between 9-499 in the response (prefer numbers near "price" keywords)
    const priceKeywords = ['price', '₹', 'service', 'cost'];
    const lines = responseText.split('\n');
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (priceKeywords.some(keyword => lowerLine.includes(keyword))) {
        const numbers = line.match(/\d+/g);
        if (numbers) {
          for (const numStr of numbers) {
            const num = parseInt(numStr);
            if (num >= 9 && num <= 499) {
              console.log(`✅ Extracted price from line with keyword: ₹${num} for "${trimmed}"`);
              return num;
            }
          }
        }
      }
    }
    
    // Final fallback: find any number between 9-499
    const numbers = responseText.match(/\d+/g);
    if (numbers) {
      for (const numStr of numbers) {
        const num = parseInt(numStr);
        if (num >= 9 && num <= 499) {
          console.log(`✅ Extracted price (fallback): ₹${num} for "${trimmed}"`);
          return num;
        }
      }
    }
    
    console.warn(`⚠️ Could not extract price from suggestTool response for "${trimmed}"`);
    console.log('Response preview:', responseText.substring(0, 500));
    
    // If still no price found, use fallback based on description
    const lowerDesc = trimmed.toLowerCase();
    if (lowerDesc.includes('simple') || lowerDesc.includes('basic')) {
      return 19;
    }
    if (lowerDesc.includes('clothing') || lowerDesc.includes('app') || lowerDesc.includes('ecommerce')) {
      return 199;
    }
    if (lowerDesc.includes('platform') || lowerDesc.includes('complex')) {
      return 399;
    }
    
    // Default fallback
    if (trimmed.length < 30) return 49;
    if (trimmed.length < 60) return 99;
    return 199;
  } catch (error) {
    console.error("Error calculating price:", error);
    // Fallback pricing based on description
    const lowerDesc = trimmed.toLowerCase();
    if (lowerDesc.includes('clothing') || lowerDesc.includes('app')) {
      return 199;
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