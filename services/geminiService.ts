import { GoogleGenAI } from "@google/genai";

// IMPORTANT: This service requires a valid Gemini API key to be set in
// the environment variable `process.env.API_KEY`.
// The application assumes this key is provided in its runtime environment.

let ai: GoogleGenAI | null = null;
try {
    if (process.env.API_KEY) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("Gemini API key not found. AI features will be disabled.");
    }
} catch(e) {
    console.error("Error initializing GoogleGenAI", e);
}


export const generateDescription = async (title: string): Promise<string> => {
  if (!ai) {
    return "AI service is not available. Please provide an API key.";
  }
  
  try {
    const prompt = `You are a helpful assistant for a university's Lost & Found portal. Generate a detailed, friendly, and helpful description for a newly found item listing. The title of the item is "${title}". The description should encourage the rightful owner to come forward and claim it. Include some general details one might expect for such an item, and mention that they should provide specific details to verify ownership. Keep the tone helpful and clear. Keep it under 80 words.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Could not generate a description at this time. Please write one manually.";
  }
};
