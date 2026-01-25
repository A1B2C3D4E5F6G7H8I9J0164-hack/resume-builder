import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

export async function generateResumeContent(data: any) {
  if (!process.env.GEMINI_API_KEY) {
    return "AI generation is currently disabled. Please provide a GEMINI_API_KEY in the environment variables.";
  }

  const prompt = `
    You are a professional resume writer. Based on the following data, generate a compelling professional summary and improve the descriptions of experiences and projects to be more impact-oriented and professional.
    
    Data:
    ${JSON.stringify(data, null, 2)}
    
    Output format:
    JSON with:
    {
      "summary": "Improved professional summary",
      "experience": [
        { "id": "original_id", "description": "Improved description" }
      ],
      "projects": [
        { "id": "original_id", "description": "Improved description" }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate content with AI");
  }
}
