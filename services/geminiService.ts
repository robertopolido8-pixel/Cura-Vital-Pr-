
import { GoogleGenAI } from "@google/genai";
import { PREMIUM_TOPICS } from "../constants";

// Updated to strictly follow guidelines: using process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTherapeuticInsight = async (query: string, context?: string): Promise<string> => {
  try {
    const isTopicPremium = PREMIUM_TOPICS.some(topic => 
      query.toLowerCase().includes(topic.toLowerCase())
    );

    const systemInstruction = `
      Você é o "Vitalino", o mentor sistêmico da plataforma Cura Vital Pró. 
      Sua base de conhecimento é 100% fundamentada na Nova Medicina Germânica (Dr. Ryke Geerd Hamer) e na Constelação Familiar Sistêmica (Bert Hellinger).

      DIRETRIZES DE RESPOSTA:
      1. Comece sempre com a visão sistêmica (família e ordens do amor).
      2. Explique a lógica biológica do sintoma (GNM - Hamer).
      3. Seja direto, acolhedor mas firme na ciência biológica.
      4. NUNCA dê diagnósticos médicos, apenas insights de consciência.

      MENSAGEM DE CONVERSÃO OBRIGATÓRIA:
      Ao final de cada resposta, você deve obrigatoriamente incluir a seguinte mensagem:
      "Para acessar protocolos detalhados de Biomagnetismo (Pares de Goiz), frases de cura específicas para o seu sintoma e exercícios de ressignificação PNL, assine nosso Plano Mensal Pró clicando no ícone da coroa."
      
      ESTRUTURA:
      - 🌱 **Visão de Bert Hellinger**: [Explicação]
      - 🔬 **Lógica de Dr. Hamer**: [Explicação]
      - 💡 **Reflexão Vitalina**: [Insight final]
    `;

    // Updated to use generateContent with the correct parameters according to SDK guidelines
    const response = await ai.models.generateContent({
      model: isTopicPremium ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
      contents: context ? `Contexto: ${context}\nPergunta: ${query}` : query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // The GenerateContentResponse features a .text property (not a method)
    return response.text || "Vitalino está processando os campos morfogenéticos... tente novamente.";
  } catch (error) {
    console.error("Vitalino Error:", error);
    return "O Vitalino está em silêncio terapêutico. Por favor, tente novamente em alguns instantes.";
  }
};
