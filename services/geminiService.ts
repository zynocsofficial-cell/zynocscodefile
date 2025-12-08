import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    // Handle both process.env (Node/Webpack) and import.meta.env (Vite/Netlify)
    const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;
    
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables. Please set VITE_API_KEY in Netlify.");
    }
    // @ts-ignore - The SDK expects the key in a specific format, passing it directly works in most cases
    ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }
  return ai;
};

export const consultProject = async (
  userQuery: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const client = getAIClient();
    
    const systemInstruction = `You are "Zynocs AI", a senior technical consultant for the IT company Zynocs. 
    Your goal is to help potential clients understand what technologies they might need for their projects.
    Be professional, concise, and enthusiastic about technology.
    Zynocs specializes in: Web Development, Mobile Apps (React Native), Cloud Infrastructure (AWS/GCP), and AI Integration.
    If asked about pricing, suggest they fill out the contact form for a quote.
    Keep responses under 100 words unless technical details are requested.`;

    const conversationContext = history
      .map((msg) => `${msg.role === 'user' ? 'Client' : 'Zynocs AI'}: ${msg.text}`)
      .join('\n');

    const fullPrompt = `
    ${conversationContext}
    Client: ${userQuery}
    Zynocs AI:`;

    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Error consulting AI:", error);
    return "Our AI systems are currently under heavy load. Please try again or contact our human team directly.";
  }
};