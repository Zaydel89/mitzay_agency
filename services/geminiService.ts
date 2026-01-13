
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (userMessage: string, history: {role: 'user'|'assistant', content: string}[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "Eres el asistente experto de MitZay Agency, una agencia de Marketing Digital, IA y Automatización. Tu objetivo es asesorar a clientes potenciales sobre diseño web, automatización de flujos y contenido estratégico. Eres profesional, innovador, directo y amable. Respondes siempre en español.",
        temperature: 0.7,
      }
    });

    return response.text || "Lo siento, mi conexión ha tenido un contratiempo. ¿Podrías repetir tu consulta?";
    
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "Error de enlace con el núcleo de datos. Por favor, asegúrate de que tu conexión sea estable.";
  }
};
