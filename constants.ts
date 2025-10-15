
import type { Category } from './types';
import { 
  Code, BrainCircuit, Pencil, Video, Briefcase, DollarSign, Sparkles, GraduationCap, HeartPulse,
  Palette, Music, Camera, Globe, Shield, Zap, Users, BarChart3, FileText, Gamepad2,
  ShoppingCart, Home, Car, Plane, Utensils, Coffee, Wrench, Smartphone, Laptop,
  Database, Lock, Eye, Search, MessageSquare, Calendar, Clock, Star, TrendingUp
} from 'lucide-react';

export const CALENDLY_LINK = "https://calendly.com/your-link";

export const CATEGORIES: Category[] = [
    {
    name: "General Purpose AI",
    icon: BrainCircuit,
    subCategories: [
      {
        name: "Conversational AI",
        tools: [
          { name: "ChatGPT (GPT-4)", description: "OpenAI's flagship language model, excelling at nuanced conversation, complex problem-solving, and creative text generation.", pros: ["State-of-the-art reasoning and creativity", "Massive general knowledge base", "Integrates browsing, data analysis, and DALL-E 3"], cons: ["Requires a monthly subscription for the best model", "Knowledge cutoff (though browsing helps)", "Can be prone to factual errors ('hallucinations')"], link: "https://chat.openai.com/" },
          { name: "Google Gemini", description: "Google's powerful multimodal AI model, designed to understand and process text, images, audio, and video.", pros: ["Natively multimodal from the ground up", "Deep integration with Google's ecosystem (Workspace, Cloud)", "Often faster and more up-to-date with recent information"], cons: ["Still newer, so its capabilities are evolving", "Can be less 'creative' or 'stylized' than GPT-4 in some text tasks"], link: "https://gemini.google.com/" },
          { name: "Claude 3", description: "Anthropic's family of AI models, known for its large context window, sophisticated reasoning, and focus on safety.", pros: ["Huge context window (up to 200K tokens) for analyzing large documents", "Strong performance in coding and technical tasks", "Often produces more 'neutral' and less verbose responses"], cons: ["API access can be more expensive than competitors", "Less focused on multimodal features compared to Gemini"], link: "https://www.anthropic.com/claude" },
          { name: "Pi by Inflection", description: "A personal AI assistant designed to be helpful, harmless, and honest in conversations.", pros: ["Designed specifically for personal conversations", "Strong focus on safety and helpfulness", "Good at emotional support and advice"], cons: ["More limited in technical capabilities", "Smaller knowledge base compared to GPT-4"], link: "https://pi.ai/" },
          { name: "Character.AI", description: "Create and chat with AI characters, from historical figures to fictional personalities.", pros: ["Highly customizable character creation", "Great for roleplay and creative writing", "Large community of user-created characters"], cons: ["Characters can be inconsistent", "Not suitable for serious professional tasks"], link: "https://character.ai/" },
        ]
      },
      {
        name: "AI Search & Research",
        tools: [
          { name: "Perplexity AI", description: "An 'answer engine' that provides direct, cited answers to complex questions using AI.", pros: ["Provides sources and citations for its answers", "Excellent for research and learning about new topics", "Conversational follow-up questions are very helpful"], cons: ["Can sometimes misinterpret sources", "Pro plan needed for advanced features like file uploads"], link: "https://www.perplexity.ai/" },
          { name: "You.com", description: "AI-powered search engine that provides comprehensive answers with multiple sources.", pros: ["Combines search results with AI-generated summaries", "Shows multiple perspectives on topics", "Good for current events and recent information"], cons: ["Can be slower than traditional search", "Sometimes includes irrelevant sources"], link: "https://you.com/" },
          { name: "Bing Chat", description: "Microsoft's AI-powered search assistant integrated into Bing search engine.", pros: ["Free to use with Microsoft account", "Access to real-time web information", "Good integration with Microsoft ecosystem"], cons: ["Limited conversation length", "Can be more conservative in responses"], link: "https://www.bing.com/new" },
        ]
      },
      {
        name: "AI Writing Assistants",
        tools: [
          { name: "Grammarly", description: "AI-powered writing assistant that helps improve grammar, style, and tone.", pros: ["Excellent grammar and spelling correction", "Tone suggestions for different contexts", "Works across multiple platforms and browsers"], cons: ["Can be overly prescriptive", "Premium features are expensive"], link: "https://www.grammarly.com/" },
          { name: "QuillBot", description: "AI-powered paraphrasing and writing tool that helps improve and rephrase text.", pros: ["Great for paraphrasing and summarizing", "Multiple writing modes and styles", "Free tier available with good features"], cons: ["Can sometimes change meaning", "Limited word count on free plan"], link: "https://quillbot.com/" },
          { name: "Wordtune", description: "AI writing assistant that helps you rewrite and improve your sentences.", pros: ["Natural-sounding rewrites", "Multiple tone options", "Good for professional writing"], cons: ["Limited free usage", "Can be repetitive in suggestions"], link: "https://www.wordtune.com/" },
        ]
      }
    ]
  },
  {
    name: "Development",
    icon: Code,
    subCategories: [
      {
        name: "Code Assistant",
        tools: [
          { name: "GitHub Copilot", description: "Your AI pair programmer. Get suggestions for whole lines or entire functions right in your editor.", pros: ["Deep integration with VS Code & JetBrains", "Excellent context-awareness from your codebase", "Speeds up boilerplate and repetitive code significantly"], cons: ["Requires a monthly subscription", "Can occasionally suggest incorrect or insecure code", "Uses significant system resources"], link: "https://github.com/features/copilot" },
          { name: "Replit Ghostwriter", description: "An AI-powered coding assistant that helps you write, debug, and understand code in the Replit IDE.", pros: ["Seamlessly integrated into a collaborative, cloud-based IDE", "Excellent for learning and prototyping", "'Explain Code' feature is great for beginners"], cons: ["Effectiveness is confined to the Replit ecosystem", "Less powerful than Copilot for large, local projects"], link: "https://replit.com/ghostwriter" },
          { name: "Tabnine", description: "AI assistant that provides powerful code completions, trained on open-source code or your own private repositories.", pros: ["Offers a completely private, self-hosted model for enterprises", "Learns your personal coding style over time", "Supports a very wide range of languages and IDEs"], cons: ["Free version is noticeably less powerful", "Can be resource-intensive on older machines"], link: "https://www.tabnine.com/" },
          { name: "Amazon CodeWhisperer", description: "AI coding companion that generates code suggestions in real-time.", pros: ["Free tier available", "Good security scanning", "Supports multiple programming languages"], cons: ["Less sophisticated than Copilot", "Limited IDE support"], link: "https://aws.amazon.com/codewhisperer/" },
          { name: "Codeium", description: "Free AI code completion tool that works across multiple IDEs and languages.", pros: ["Completely free", "Fast and responsive", "Good privacy features"], cons: ["Less context-aware than paid alternatives", "Smaller model compared to GPT-4"], link: "https://codeium.com/" },
        ]
      },
      {
        name: "Testing & Debugging",
        tools: [
           { name: "MutableAI", description: "AI-accelerated software development. Instantly refactor, document, and test your code.", pros: ["Generates full test suites with one click", "AI-powered refactoring suggestions improve code quality", "Can auto-generate documentation for your functions"], cons: ["Still a relatively new tool, can have bugs", "May not support niche frameworks or languages well"], link: "https://mutable.ai/" },
           { name: "CodiumAI", description: "AI-powered tool that analyzes your code and generates meaningful tests to catch bugs before you ship.", pros: ["Focuses on generating meaningful, behavior-driven tests", "Great IDE integration for a smooth workflow", "Helps significantly increase test coverage quickly"], cons: ["Generated tests still require careful review and modification", "Can be slow on very large or complex codebases"], link: "https://www.codium.ai/" },
           { name: "Sentry", description: "Error tracking and performance monitoring with AI-powered features to help you debug faster.", pros: ["AI suggests root causes for errors", "Groups similar issues automatically", "Provides rich context for debugging"], cons: ["Can become expensive for high-volume applications", "Initial setup can be complex"], link: "https://sentry.io/" },
           { name: "DeepCode", description: "AI-powered code review tool that finds bugs and security vulnerabilities.", pros: ["Excellent at finding security issues", "Supports many programming languages", "Integrates with popular CI/CD tools"], cons: ["Can produce false positives", "Requires code to be uploaded to their platform"], link: "https://www.deepcode.ai/" },
        ]
      },
      {
        name: "Code Generation",
        tools: [
          { name: "v0 by Vercel", description: "AI-powered UI component generator that creates React components from text descriptions.", pros: ["Generates production-ready React code", "Great for rapid prototyping", "Integrates with Vercel ecosystem"], cons: ["Limited to UI components", "Requires Vercel account"], link: "https://v0.dev/" },
          { name: "CodeT5", description: "Open-source code generation model by Salesforce.", pros: ["Completely open source", "Good for code summarization", "Can be fine-tuned for specific tasks"], cons: ["Requires technical setup", "Less user-friendly than commercial tools"], link: "https://github.com/salesforce/CodeT5" },
          { name: "GitHub Copilot X", description: "Next-generation AI coding assistant with chat, docs, and pull request features.", pros: ["Chat interface for code questions", "Can explain and modify entire codebases", "Pull request summaries and reviews"], cons: ["Still in preview", "Requires GitHub Copilot subscription"], link: "https://github.com/features/copilot" },
        ]
      },
      {
        name: "DevOps & Deployment",
        tools: [
          { name: "GitHub Actions", description: "AI-powered CI/CD platform with intelligent workflow suggestions.", pros: ["Integrated with GitHub ecosystem", "AI suggests workflow improvements", "Extensive marketplace of actions"], cons: ["Limited free minutes", "Can be complex for beginners"], link: "https://github.com/features/actions" },
          { name: "Datadog", description: "AI-powered monitoring and observability platform for applications.", pros: ["Excellent AI-powered anomaly detection", "Comprehensive monitoring suite", "Good alerting and incident management"], cons: ["Can be expensive at scale", "Steep learning curve"], link: "https://www.datadoghq.com/" },
          { name: "New Relic", description: "AI-powered application performance monitoring and observability platform.", pros: ["Strong AI insights and recommendations", "Good for complex distributed systems", "Comprehensive error tracking"], cons: ["Pricing can be complex", "Can be overwhelming for simple applications"], link: "https://newrelic.com/" },
        ]
      }
    ]
  },
  {
    name: "Content & Design",
    icon: Pencil,
    subCategories: [
      {
        name: "Writing & Text",
        tools: [
          { name: "Jasper", description: "AI Content Platform for teams that helps break through creative blocks to create original content 10X faster.", pros: ["Excellent for marketing copy with many specialized templates", "Maintains a consistent brand voice across content", "Good collaboration features for teams"], cons: ["Premium pricing, one of the more expensive options", "Can have a steep learning curve to master"], link: "https://www.jasper.ai/" },
          { name: "Copy.ai", description: "AI-powered copywriter that generates high-quality copy for your business, social media, and more.", pros: ["Generous free plan is great for starting out", "Very intuitive and user-friendly interface", "Ideal for short-form content like headlines and social posts"], cons: ["Long-form content quality can be inconsistent", "Output can sometimes feel generic without heavy editing"], link: "https://www.copy.ai/" },
          { name: "Notion AI", description: "Leverage AI in your Notion workspace. Write faster, think bigger, and augment creativity seamlessly.", pros: ["Perfectly integrated into the Notion ecosystem", "Excellent for summarizing existing notes and brainstorming", "Cost-effective if you already use Notion"], cons: ["Less powerful than dedicated writing tools", "Functionality is entirely dependent on being in Notion"], link: "https://www.notion.so/product/ai" },
          { name: "Writesonic", description: "AI-powered content creation platform for marketing copy, blogs, and ads.", pros: ["Good for long-form content", "Multiple content templates", "SEO optimization features"], cons: ["Can be repetitive", "Limited free credits"], link: "https://writesonic.com/" },
          { name: "Rytr", description: "AI writing assistant that helps create high-quality content in 30+ languages.", pros: ["Affordable pricing", "Multiple writing tones", "Good for social media content"], cons: ["Limited customization", "Can produce generic content"], link: "https://rytr.me/" },
        ]
      },
      {
        name: "Image Generation",
        tools: [
          { name: "Midjourney", description: "An independent research lab producing a proprietary AI that creates images from textual descriptions.", pros: ["Produces highly artistic, stylized, and beautiful images", "Strong community on Discord for inspiration and help", "Excellent for creative and abstract concepts"], cons: ["Unique Discord-based interface is not for everyone", "Requires learning specific prompting techniques"], link: "https://www.midjourney.com/" },
          { name: "DALL-E 3", description: "An AI system by OpenAI that can create realistic images and art from a description in natural language.", pros: ["Integrates directly with ChatGPT Plus", "Superb at understanding and executing complex, detailed prompts", "Great for photorealistic and illustrative styles"], cons: ["Requires a ChatGPT Plus subscription", "Has more content restrictions than competitors"], link: "https://openai.com/dall-e-3" },
          { name: "Adobe Firefly", description: "Adobe's family of creative generative AI models, designed to be commercially safe.", pros: ["Trained on Adobe Stock, making it safe for commercial use", "Seamless integration with Photoshop and other Adobe apps", "Features like 'Generative Fill' are revolutionary"], cons: ["Output can be less 'creative' or 'artistic' than Midjourney", "Still in heavy development with features changing often"], link: "https://www.adobe.com/sensei/generative-ai/firefly.html" },
          { name: "Stable Diffusion", description: "Open-source AI image generation model with various interfaces and customizations.", pros: ["Completely free and open source", "Highly customizable", "Can be run locally for privacy"], cons: ["Requires technical setup", "Quality varies by interface"], link: "https://stablediffusionweb.com/" },
          { name: "Leonardo AI", description: "AI image generation platform with fine-tuned models for specific styles and use cases.", pros: ["High-quality outputs", "Good for character and concept art", "User-friendly interface"], cons: ["Limited free credits", "Can be slow during peak times"], link: "https://leonardo.ai/" },
        ]
      },
      {
        name: "Design & UI",
        tools: [
          { name: "Figma AI", description: "AI-powered design features integrated into Figma for faster design workflows.", pros: ["Integrated into popular design tool", "Good for layout suggestions", "Speeds up repetitive design tasks"], cons: ["Limited AI features", "Requires Figma subscription"], link: "https://www.figma.com/" },
          { name: "Uizard", description: "AI-powered design tool that converts sketches and wireframes into digital designs.", pros: ["Great for rapid prototyping", "Converts hand-drawn sketches to digital", "Good for non-designers"], cons: ["Limited customization", "Can be expensive"], link: "https://uizard.io/" },
          { name: "Canva AI", description: "AI-powered design features in Canva for automated design generation and optimization.", pros: ["User-friendly interface", "Good for social media graphics", "AI suggests design improvements"], cons: ["Limited to templates", "Can produce generic designs"], link: "https://www.canva.com/" },
        ]
      },
      {
        name: "Video & Animation",
        tools: [
          { name: "Luma AI", description: "AI-powered 3D capture and generation platform for creating realistic 3D models.", pros: ["High-quality 3D generation", "Good for product visualization", "Easy to use"], cons: ["Limited free usage", "Requires good lighting"], link: "https://lumalabs.ai/" },
          { name: "Synthesia", description: "AI video generation platform that creates videos with AI avatars and voice synthesis.", pros: ["Professional-looking AI avatars", "Multiple languages and voices", "Good for training videos"], cons: ["Expensive", "Limited customization"], link: "https://www.synthesia.io/" },
          { name: "D-ID", description: "AI platform for creating talking head videos from photos and text.", pros: ["Realistic lip-sync", "Multiple languages", "Good for presentations"], cons: ["Limited free credits", "Can look artificial"], link: "https://www.d-id.com/" },
        ]
      }
    ]
  },
  {
    name: "Audio & Video",
    icon: Video,
    subCategories: [
      {
        name: "Video Editing & Gen",
        tools: [
          { name: "Descript", description: "An all-in-one audio and video editor that makes editing as easy as editing a word document.", pros: ["Revolutionary text-based video editing workflow", "Overdub voice cloning is scarily realistic", "'Studio Sound' feature removes background noise magically"], cons: ["Can become slow and laggy with very large video files", "The subscription model can add up"], link: "https://www.descript.com/" },
          { name: "Runway", description: "A next-generation creative suite with AI-powered tools for video generation, editing, and more.", pros: ["State-of-the-art text-to-video and video-to-video generation", "Advanced AI magic tools like inpainting and motion tracking", "Pushes the boundaries of what's possible with video"], cons: ["Can be very expensive for heavy users", "Extremely resource-heavy, requires a powerful computer"], link: "https://runwayml.com/" },
          { name: "Pika", description: "A new text-to-video platform known for its high-quality, cinematic output and control.", pros: ["Generates highly coherent and aesthetic video clips", "Offers good control over camera motion and style", "Has a generous free trial to start"], cons: ["Limited to short clips (currently ~3 seconds)", "As a new platform, it can be buggy"], link: "https://pika.art/"},
        ]
      },
      {
        name: "Audio & Voice",
        tools: [
          { name: "ElevenLabs", description: "The most realistic and versatile AI speech software for generating voiceovers, audiobooks, and more.", pros: ["Industry-leading voice realism and emotional range", "Powerful voice cloning and custom voice creation tools", "Fine-grained API control for developers"], cons: ["Can be expensive for high-volume usage", "Ethical concerns around the use of voice cloning technology"], link: "https://elevenlabs.io/" },
          { name: "Adobe Podcast", description: "A web-based AI-powered audio recording and editing tool with incredible speech enhancement.", pros: ["'Enhance Speech' feature is best-in-class for cleaning audio", "Completely free to use for its core features", "Incredibly simple and intuitive web interface"], cons: ["Very limited editing features, not a full audio editor (DAW)", "Processing can be slow for long audio files"], link: "https://podcast.adobe.com/" },
          { name: "Krisp", description: "AI-powered noise cancelling application that mutes background noise in real-time calls.", pros: ["Works with any conferencing app (Zoom, Teams, etc.)", "Removes background noise from both your mic and speaker", "Improves meeting professionalism instantly"], cons: ["Requires a subscription for full features", "Needs a small app to be installed on your system"], link: "https://krisp.ai/" },
        ]
      }
    ]
  },
   {
    name: "Business",
    icon: Briefcase,
    subCategories: [
      {
        name: "Marketing",
        tools: [
          { name: "Klaviyo", description: "An intelligent marketing automation platform using AI to help brands deliver more personalized experiences.", pros: ["Powerful customer segmentation and predictive analytics", "Combines email, SMS, and mobile push notifications", "Deep integration with e-commerce platforms like Shopify"], cons: ["Pricing can escalate quickly with a large contact list", "Can be overly complex for very small businesses"], link: "https://www.klaviyo.com/" },
          { name: "Surfer SEO", description: "A content intelligence tool that merges content strategy, creation, and optimization into one process.", pros: ["Provides data-driven recommendations to rank on Google", "Content editor gives real-time feedback on your writing", "Great for creating comprehensive, optimized articles"], cons: ["Subscription cost can be high for freelancers", "Focuses heavily on on-page SEO, not the whole picture"], link: "https://surferseo.com/" },
        ]
      },
      {
        name: "Customer Support",
        tools: [
          { name: "Intercom", description: "A complete customer service platform with AI-powered bots, ticketing, and proactive support.", pros: ["'Fin' AI chatbot provides instant, accurate answers", "Automates triaging and routing of support tickets", "Combines proactive, self-serve, and human support"], cons: ["Very expensive, primarily for established businesses", "Can be complex to set up and configure properly"], link: "https://www.intercom.com/"},
          { name: "Zendesk AI", description: "AI features within the Zendesk suite to automate and enhance customer service operations.", pros: ["Intelligent ticket routing and categorization", "AI-powered macros suggest replies to agents", "Analyzes customer intent to provide better answers"], cons: ["AI features often require higher-tier plans", "Can feel bloated if you don't need the full suite"], link: "https://www.zendesk.com/ai"},
        ]
      },
      {
        name: "Sales & CRM",
        tools: [
            { name: "Salesforce Einstein", description: "AI built right into the Salesforce platform, providing predictions and recommendations to sales reps.", pros: ["Deeply integrated with existing Salesforce data", "Provides lead scoring and opportunity insights", "Automates data entry and activity logging"], cons: ["Requires you to be a Salesforce customer", "Can be very expensive to license the AI features"], link: "https://www.salesforce.com/products/einstein/"},
            { name: "Gong", description: "A 'Revenue Intelligence' platform that uses AI to analyze customer-facing conversations.", pros: ["Transcribes and analyzes sales calls, emails, and meetings", "Provides insights into what top performers do differently", "Helps with deal forecasting and pipeline management"], cons: ["Premium pricing model", "Can feel like 'big brother' to some sales teams"], link: "https://www.gong.io/"},
        ]
      },
      {
        name: "HR & Recruiting",
        tools: [
            { name: "HireVue", description: "AI-driven platform for interviews, assessments, and hiring automation.", pros: ["Standardizes the interview process for all candidates", "Can automate initial screening of applicants", "Provides data-driven insights to reduce bias"], cons: ["Some candidates find AI-driven interviews impersonal", "Concerns about algorithmic bias are still debated"], link: "https://www.hirevue.com/"},
            { name: "Eightfold AI", description: "A 'Talent Intelligence' platform that uses a deep-learning AI to manage the entire talent lifecycle.", pros: ["Matches internal and external candidates to open roles", "Helps with employee development and retention", "Focuses on skills rather than just job titles"], cons: ["Complex platform that requires significant setup", "Primarily targeted at large enterprises"], link: "https://eightfold.ai/"},
        ]
      }
    ]
  },
  {
    name: "Finance & Data",
    icon: DollarSign,
    subCategories: [
        {
            name: "Data Analysis",
            tools: [
                { name: "Julius AI", description: "An AI data analyst that can visualize and analyze your data from spreadsheets, Excel files, and Google Sheets.", pros: ["User-friendly chat interface for complex analysis", "Can create charts and graphs from natural language prompts", "Connects to various data sources easily"], cons: ["Not as powerful as dedicated BI tools for massive datasets", "Subscription required for advanced features"], link: "https://julius.ai/"},
                { name: "Tableau Pulse", description: "AI-powered insights integrated into the Tableau platform, delivering automated analytics and key metrics.", pros: ["Surfaces insights automatically from your dashboards", "Uses natural language to explain data trends", "Integrated into a leading BI and analytics platform"], cons: ["Requires a Tableau Cloud subscription", "Less about ad-hoc analysis and more about surfacing existing data"], link: "https://www.tableau.com/products/pulse"},
            ]
        },
        {
            name: "Financial Planning",
            tools: [
                { name: "Monarch Money", description: "A modern personal finance app that uses AI to automatically categorize transactions and track goals.", pros: ["Clean, intuitive interface for budgeting and tracking", "AI helps clean up and categorize transaction data", "Great collaboration features for couples"], cons: ["Requires a subscription after the trial", "Some bank connections can be unreliable"], link: "https://www.monarchmoney.com/"},
                { name: "Kensho", description: "AI and machine learning for the finance industry, providing data analytics and insights (Enterprise-focused).", pros: ["Powerful tools for quantitative analysis and modeling", "Used by major financial institutions", "Can analyze unstructured data like earnings calls"], cons: ["Not for individual consumers, enterprise-grade tool", "Extremely high cost and complexity"], link: "https://www.kensho.com/"},
            ]
        }
    ]
  },
  {
    name: "Productivity",
    icon: Sparkles,
    subCategories: [
      {
        name: "Meeting Assistants",
        tools: [
            { name: "Otter.ai", description: "An AI-powered assistant that records, transcribes, and summarizes your meetings.", pros: ["Real-time transcription with speaker identification", "Automatically generates summaries and action items", "Integrates with Zoom, Google Meet, and Teams"], cons: ["Transcription accuracy can struggle with accents", "Free plan is quite limited in monthly minutes"], link: "https://otter.ai/" },
            { name: "Fireflies.ai", description: "AI meeting assistant that joins your calls to transcribe, summarize, and analyze voice conversations.", pros: ["Analyzes conversations for sentiment and topics", "Integrates with CRMs to log call data", "Creates a searchable knowledge base of your meetings"], cons: ["The AI bot joining calls can feel intrusive to some", "Advanced analytics are on premium plans"], link: "https://fireflies.ai/" },
        ]
      },
      {
        name: "Task & Knowledge Mgmt",
        tools: [
            { name: "Motion", description: "An AI-powered app that intelligently plans your day by building a dynamic schedule for your tasks and meetings.", pros: ["Automatically schedules tasks into your calendar", "Reorganizes your day when priorities change", "Helps combat procrastination and decision fatigue"], cons: ["Requires giving it full control of your calendar", "Subscription-based with no free tier"], link: "https://www.usemotion.com/" },
            { name: "Mem", description: "A self-organizing workspace that uses AI to connect your notes and find information instantly.", pros: ["'Smart Search' understands natural language queries", "Automatically links related notes and resources", "Creates a personal knowledge graph without manual tagging"], cons: ["Still in active development, can be buggy", "Less structured than tools like Notion"], link: "https://mem.ai/" },
        ]
      },
    ]
  },
  {
    name: "Education",
    icon: GraduationCap,
    subCategories: [
      {
        name: "Research & Learning",
        tools: [
          { name: "Perplexity AI", description: "An 'answer engine' that provides direct, cited answers to complex questions using AI.", pros: ["Provides sources and citations for its answers", "Excellent for research and learning about new topics", "Conversational follow-up questions are very helpful"], cons: ["Can sometimes misinterpret sources", "Pro plan needed for advanced features like file uploads"], link: "https://www.perplexity.ai/" },
          { name: "Elicit", description: "An AI research assistant that helps automate research workflows, finding papers and summarizing key takeaways.", pros: ["Can find relevant papers without perfect keyword matches", "Summarizes abstract takeaways from research papers", "Can extract key information into a structured table"], cons: ["Primarily for academic and scientific research", "The interface can be complex for new users"], link: "https://elicit.org/" },
        ]
      },
      {
        name: "Presentation",
        tools: [
          { name: "Tome", description: "A new medium for shaping and sharing ideas. Generate entire presentations or stories from a single prompt.", pros: ["Generates a full presentation deck from a text prompt", "Creates compelling layouts and finds relevant images", "Interactive and modern presentation format"], cons: ["Less granular control than PowerPoint or Keynote", "The AI's narrative structure can be hit-or-miss"], link: "https://tome.app/" },
          { name: "Gamma", description: "A faster way to present your ideas. Creates beautiful presentations, documents, or webpages powered by AI.", pros: ["Extremely fast way to create a first draft", "Outputs are visually appealing and well-designed by default", "Interactive elements like embeds and apps"], cons: ["Customization options are more limited than traditional tools", "Exporting to standard formats can be tricky"], link: "https://gamma.app/" },
        ]
      }
    ]
  },
    {
    name: "Healthcare",
    icon: HeartPulse,
    subCategories: [
      {
        name: "Medical Scribe & Docs",
        tools: [
          { name: "Abridge", description: "An AI-powered medical scribe that structures and summarizes any medical conversation.", pros: ["Saves clinicians hours on documentation", "Generates real-time, structured clinical notes", "Integrates with electronic health records (EHR)"], cons: ["Primarily for clinical professionals", "Requires careful review for medical accuracy"], link: "https://www.abridge.com/" },
          { name: "Nabla Copilot", description: "An ambient AI assistant for healthcare professionals that generates clinical notes from patient encounters.", pros: ["Works ambiently in the background during consultations", "Supports multiple languages and accents", "Helps reduce physician burnout from paperwork"], cons: ["Subscription-based service", "Data privacy and HIPAA compliance are critical considerations"], link: "https://www.nabla.com/" },
        ]
      },
      {
        name: "Diagnostics & Imaging",
        tools: [
          { name: "Viz.ai", description: "An AI-powered care coordination platform that accelerates diagnosis and treatment for critical conditions.", pros: ["Uses AI to analyze medical images and detect diseases", "Alerts care teams in real-time for faster intervention", "Proven to improve patient outcomes in stroke and aneurysm cases"], cons: ["Requires hospital-level integration", "Not a tool for individual practitioners or patients"], link: "https://www.viz.ai/" },
        ]
      }
    ]
  },
  {
    name: "Creative & Art",
    icon: Palette,
    subCategories: [
      {
        name: "Digital Art",
        tools: [
          { name: "Artbreeder", description: "AI-powered platform for creating and collaborating on digital art through genetic algorithms.", pros: ["Unique genetic art creation", "Large community of artists", "Good for exploring artistic styles"], cons: ["Can be unpredictable", "Limited control over final output"], link: "https://www.artbreeder.com/" },
          { name: "NightCafe", description: "AI art generator with multiple algorithms and styles for creating digital artwork.", pros: ["Multiple AI models to choose from", "Good community features", "Regular contests and challenges"], cons: ["Credits system can be limiting", "Quality varies by model"], link: "https://nightcafe.studio/" },
          { name: "Dream by Wombo", description: "AI-powered app that transforms text prompts into artwork using various artistic styles.", pros: ["Mobile-friendly", "Quick generation", "Multiple art styles"], cons: ["Limited customization", "Basic features"], link: "https://dream.ai/" },
        ]
      },
      {
        name: "Music & Audio",
        tools: [
          { name: "AIVA", description: "AI composer that creates original music for various purposes including films, games, and commercials.", pros: ["Professional-quality compositions", "Multiple musical styles", "Good for background music"], cons: ["Limited customization", "Can sound repetitive"], link: "https://www.aiva.ai/" },
          { name: "Suno AI", description: "AI music generator that creates complete songs with vocals from text prompts.", pros: ["Creates full songs with lyrics", "Multiple genres", "Good quality vocals"], cons: ["Limited free usage", "Can be generic"], link: "https://suno.ai/" },
          { name: "Mubert", description: "AI-generated royalty-free music for content creators and businesses.", pros: ["Royalty-free", "Continuous generation", "Good for background music"], cons: ["Limited customization", "Can be repetitive"], link: "https://mubert.com/" },
        ]
      },
      {
        name: "3D & Animation",
        tools: [
          { name: "Kaedim", description: "AI-powered 3D model generation from 2D images for game development and visualization.", pros: ["High-quality 3D models", "Good for game assets", "Fast generation"], cons: ["Limited free usage", "Requires good input images"], link: "https://www.kaedim3d.com/" },
          { name: "Plask", description: "AI-powered motion capture and animation tool that creates 3D animations from video.", pros: ["No special equipment needed", "Good for indie developers", "Realistic motion capture"], cons: ["Limited to humanoid characters", "Can be expensive"], link: "https://plask.ai/" },
        ]
      }
    ]
  },
  {
    name: "E-commerce & Retail",
    icon: ShoppingCart,
    subCategories: [
      {
        name: "Product Management",
        tools: [
          { name: "Veeqo", description: "AI-powered inventory management and order fulfillment platform for e-commerce businesses.", pros: ["Automated inventory tracking", "Multi-channel selling", "Good analytics"], cons: ["Can be complex to set up", "Pricing varies by volume"], link: "https://www.veeqo.com/" },
          { name: "Shopify Magic", description: "AI-powered features in Shopify for product descriptions, image optimization, and customer insights.", pros: ["Integrated with Shopify", "Good for product descriptions", "Automated image optimization"], cons: ["Limited to Shopify users", "Basic AI features"], link: "https://www.shopify.com/magic" },
          { name: "Feedvisor", description: "AI-powered Amazon optimization platform for pricing, advertising, and inventory management.", pros: ["Specialized for Amazon", "Good pricing optimization", "Comprehensive analytics"], cons: ["Expensive", "Limited to Amazon marketplace"], link: "https://feedvisor.com/" },
        ]
      },
      {
        name: "Customer Experience",
        tools: [
          { name: "Zendesk Answer Bot", description: "AI-powered chatbot that provides instant answers to customer questions using your knowledge base.", pros: ["Integrates with Zendesk", "Reduces support tickets", "Easy to set up"], cons: ["Requires Zendesk subscription", "Limited customization"], link: "https://www.zendesk.com/answer-bot/" },
          { name: "Gorgias", description: "AI-powered customer service platform designed specifically for e-commerce businesses.", pros: ["E-commerce focused", "Good automation features", "Integrates with major platforms"], cons: ["Can be expensive", "Limited to e-commerce"], link: "https://www.gorgias.com/" },
        ]
      }
    ]
  },
  {
    name: "Real Estate",
    icon: Home,
    subCategories: [
      {
        name: "Property Analysis",
        tools: [
          { name: "Zillow Zestimate", description: "AI-powered home valuation tool that estimates property values using machine learning.", pros: ["Widely used and trusted", "Free to use", "Good for initial estimates"], cons: ["Can be inaccurate", "Limited to certain markets"], link: "https://www.zillow.com/zestimate/" },
          { name: "HouseCanary", description: "AI-powered real estate analytics platform for investors and agents.", pros: ["Detailed market analysis", "Good for investors", "Comprehensive data"], cons: ["Expensive", "Complex interface"], link: "https://www.housecanary.com/" },
        ]
      },
      {
        name: "Virtual Tours",
        tools: [
          { name: "Matterport", description: "AI-powered 3D virtual tour platform for real estate and other industries.", pros: ["High-quality 3D tours", "Good for marketing", "Easy to share"], cons: ["Expensive", "Requires special camera"], link: "https://matterport.com/" },
          { name: "Zillow 3D Home", description: "AI-powered virtual tour creation tool for real estate listings.", pros: ["Free to use", "Easy to create", "Good quality"], cons: ["Limited features", "Requires Zillow account"], link: "https://www.zillow.com/3d-home/" },
        ]
      }
    ]
  },
  {
    name: "Transportation & Logistics",
    icon: Car,
    subCategories: [
      {
        name: "Route Optimization",
        tools: [
          { name: "OptimoRoute", description: "AI-powered route optimization software for delivery and field service businesses.", pros: ["Reduces fuel costs", "Improves efficiency", "Good for multiple vehicles"], cons: ["Can be complex", "Requires accurate data"], link: "https://optimoroute.com/" },
          { name: "Route4Me", description: "AI-powered route planning and optimization for delivery and field service.", pros: ["User-friendly", "Good mobile app", "Multiple optimization options"], cons: ["Limited free plan", "Can be slow with many stops"], link: "https://route4me.com/" },
        ]
      },
      {
        name: "Fleet Management",
        tools: [
          { name: "Samsara", description: "AI-powered fleet management platform with predictive analytics and safety features.", pros: ["Comprehensive fleet data", "Good safety features", "Predictive maintenance"], cons: ["Expensive", "Complex setup"], link: "https://www.samsara.com/" },
          { name: "Verizon Connect", description: "AI-powered fleet management solution with route optimization and driver behavior analysis.", pros: ["Good driver coaching", "Fuel efficiency tracking", "Comprehensive reporting"], cons: ["Can be expensive", "Requires hardware installation"], link: "https://www.verizonconnect.com/" },
        ]
      }
    ]
  },
  {
    name: "Food & Hospitality",
    icon: Utensils,
    subCategories: [
      {
        name: "Restaurant Management",
        tools: [
          { name: "Toast", description: "AI-powered restaurant management platform with POS, inventory, and analytics features.", pros: ["All-in-one solution", "Good analytics", "Easy to use"], cons: ["Can be expensive", "Limited customization"], link: "https://pos.toasttab.com/" },
          { name: "OpenTable", description: "AI-powered restaurant reservation and table management platform.", pros: ["Large customer base", "Good for reservations", "Marketing features"], cons: ["Commission fees", "Limited to reservations"], link: "https://www.opentable.com/" },
        ]
      },
      {
        name: "Food Delivery",
        tools: [
          { name: "DoorDash Drive", description: "AI-powered delivery logistics platform for restaurants and businesses.", pros: ["Large delivery network", "Good tracking", "Multiple delivery options"], cons: ["High commission fees", "Limited control over delivery"], link: "https://get.doordash.com/drive/" },
          { name: "Uber Eats", description: "AI-powered food delivery platform with dynamic pricing and route optimization.", pros: ["Large customer base", "Good driver network", "Real-time tracking"], cons: ["High commission fees", "Limited to certain areas"], link: "https://www.ubereats.com/" },
        ]
      }
    ]
  },
  {
    name: "Gaming & Entertainment",
    icon: Gamepad2,
    subCategories: [
      {
        name: "Game Development",
        tools: [
          { name: "Unity ML-Agents", description: "AI toolkit for creating intelligent NPCs and game characters using machine learning.", pros: ["Free to use", "Good documentation", "Integrates with Unity"], cons: ["Requires Unity knowledge", "Can be complex"], link: "https://unity.com/products/machine-learning-agents" },
          { name: "Promethean AI", description: "AI-powered game asset generation and level design tool for game developers.", pros: ["Speeds up asset creation", "Good for prototyping", "Easy to use"], cons: ["Limited to certain game types", "Can be expensive"], link: "https://prometheanai.com/" },
        ]
      },
      {
        name: "Content Creation",
        tools: [
          { name: "Loom AI", description: "AI-powered video creation platform with automated editing and transcription features.", pros: ["Easy to use", "Good for tutorials", "Automatic transcription"], cons: ["Limited editing features", "Can be expensive"], link: "https://www.loom.com/" },
          { name: "Streamlabs", description: "AI-powered streaming software with automated moderation and engagement features.", pros: ["Good for streamers", "Automated moderation", "Easy setup"], cons: ["Limited free features", "Can be resource intensive"], link: "https://streamlabs.com/" },
        ]
      }
    ]
  },
  {
    name: "Security & Privacy",
    icon: Shield,
    subCategories: [
      {
        name: "Cybersecurity",
        tools: [
          { name: "Darktrace", description: "AI-powered cybersecurity platform that detects and responds to threats in real-time.", pros: ["Real-time threat detection", "Good for enterprise", "Automated response"], cons: ["Expensive", "Complex setup"], link: "https://www.darktrace.com/" },
          { name: "CrowdStrike", description: "AI-powered endpoint protection platform with threat intelligence and response capabilities.", pros: ["Comprehensive protection", "Good threat intelligence", "Cloud-based"], cons: ["Can be expensive", "Requires management"], link: "https://www.crowdstrike.com/" },
        ]
      },
      {
        name: "Privacy & Compliance",
        tools: [
          { name: "OneTrust", description: "AI-powered privacy management platform for GDPR compliance and data protection.", pros: ["Comprehensive compliance", "Good automation", "Multiple regulations"], cons: ["Can be complex", "Expensive"], link: "https://www.onetrust.com/" },
          { name: "BigID", description: "AI-powered data discovery and privacy platform for data governance and compliance.", pros: ["Good data discovery", "Privacy compliance", "Risk assessment"], cons: ["Complex setup", "Can be expensive"], link: "https://www.bigid.com/" },
        ]
      }
    ]
  },
  {
    name: "Social Media & Marketing",
    icon: Users,
    subCategories: [
      {
        name: "Content Creation",
        tools: [
          { name: "Hootsuite Insights", description: "AI-powered social media analytics and content optimization platform.", pros: ["Comprehensive analytics", "Content suggestions", "Multiple platforms"], cons: ["Can be expensive", "Limited free features"], link: "https://hootsuite.com/" },
          { name: "Buffer", description: "AI-powered social media management platform with content scheduling and analytics.", pros: ["Easy to use", "Good scheduling", "Analytics included"], cons: ["Limited free plan", "Basic AI features"], link: "https://buffer.com/" },
        ]
      },
      {
        name: "Influencer Marketing",
        tools: [
          { name: "AspireIQ", description: "AI-powered influencer marketing platform for finding and managing influencer partnerships.", pros: ["Good influencer discovery", "Campaign management", "Analytics"], cons: ["Can be expensive", "Limited to certain platforms"], link: "https://www.aspireiq.com/" },
          { name: "Upfluence", description: "AI-powered influencer marketing platform with automated influencer discovery and management.", pros: ["Large influencer database", "Good automation", "Comprehensive analytics"], cons: ["Expensive", "Complex interface"], link: "https://www.upfluence.com/" },
        ]
      }
    ]
  }
];
