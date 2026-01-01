import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// System context for the marketplace assistant
const ASSISTANT_SYSTEM_PROMPT = `You are the AI assistant for Mercato94, a premium digital marketplace for templates, UI kits, fonts, icons, and other digital products. Your name is "Mercato Assistant".

Key information about Mercato94:
- We offer two license types: Standard License (single commercial project) and Extended License (unlimited commercial projects)
- Platform commission is 12%, sellers keep 88%
- Refunds are available for corrupt files, misrepresented products, or wrong items - contact support@mercato94.com
- All products can be used commercially with the appropriate license
- Payments are processed securely via Stripe

Be helpful, concise, and friendly. If you don't know something specific about a user's order, direct them to support@mercato94.com.`;

// Canned fallback responses when API is unavailable
const fallbackResponses: Record<string, string> = {
    default: "I'm sorry, I can only answer questions about licenses, refunds, and commercial use at the moment. Please try one of the suggestions or contact support for other questions.",
    license: "We offer two main licenses: a Standard License for personal or single commercial projects, and an Extended License for unlimited commercial projects. You can find more details on each product page.",
    refund: "Due to the nature of digital products, we generally do not offer refunds. However, we will grant a refund if a file is corrupt, the product is misrepresented, or you received the wrong item. Please contact support@mercato94.com with your order number and a description of the issue to request a refund.",
    commercial: "Yes, all our products can be used for commercial purposes. The Standard License covers one commercial project, while the Extended License allows for unlimited commercial projects.",
};

/**
 * Chat with the AI assistant
 */
export async function chatWithAssistant(
    message: string,
    history: Array<{ role: "user" | "assistant"; content: string }>
): Promise<string> {
    // If no API key, use fallback
    if (!genAI) {
        return getFallbackResponse(message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert history to Gemini format
        const chatHistory = history.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: chatHistory,
            systemInstruction: ASSISTANT_SYSTEM_PROMPT,
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return response || getFallbackResponse(message);
    } catch (error) {
        console.error("Gemini API error:", error);
        return getFallbackResponse(message);
    }
}

/**
 * Generate product description based on title and category
 */
export async function generateProductDescription(
    title: string,
    category: string
): Promise<{ short: string; full: string }> {
    // Default fallback descriptions
    const fallback = {
        short: `A meticulously crafted ${category.toLowerCase()} designed for modern creators.`,
        full: `${title} is a premium ${category.toLowerCase()} designed for modern creators and professionals.\n\nThis product features high-quality assets, fully customizable layouts, and comprehensive documentation. Perfect for professionals seeking premium quality and attention to detail.\n\nWhat's included:\n• All source files\n• Documentation\n• Free updates\n• Premium support`,
    };

    if (!genAI) {
        return fallback;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a copywriter for a premium digital marketplace. Generate product descriptions for a digital product.

Product Title: ${title}
Category: ${category}

Generate two descriptions:
1. SHORT DESCRIPTION (1-2 sentences, max 150 characters): A compelling one-liner for product cards
2. FULL DESCRIPTION (2-3 paragraphs): Detailed description including features, benefits, and what's included

Format your response exactly like this:
SHORT: [your short description here]
FULL: [your full description here]

Make it professional, compelling, and highlight value. Use line breaks for readability in the full description.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Parse the response
        const shortMatch = text.match(/SHORT:\s*(.+?)(?=FULL:|$)/s);
        const fullMatch = text.match(/FULL:\s*(.+)/s);

        return {
            short: shortMatch?.[1]?.trim() || fallback.short,
            full: fullMatch?.[1]?.trim() || fallback.full,
        };
    } catch (error) {
        console.error("Gemini API error:", error);
        return fallback;
    }
}

/**
 * Generate smart tags based on product info
 */
export async function generateSmartTags(
    title: string,
    description: string
): Promise<string[]> {
    const fallbackTags = ["premium", "digital", "professional"];

    if (!genAI) {
        return fallbackTags;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate 5-8 relevant search tags for this digital product. Return ONLY the tags separated by commas, nothing else.

Product Title: ${title}
Description: ${description}

Tags should be lowercase, single words or short phrases that buyers might search for.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const tags = text
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag.length > 0 && tag.length < 30)
            .slice(0, 8);

        return tags.length > 0 ? tags : fallbackTags;
    } catch (error) {
        console.error("Gemini API error:", error);
        return fallbackTags;
    }
}

/**
 * Get fallback response based on keywords
 */
function getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("license")) {
        return fallbackResponses.license;
    }
    if (lowerMessage.includes("refund")) {
        return fallbackResponses.refund;
    }
    if (lowerMessage.includes("commercial")) {
        return fallbackResponses.commercial;
    }

    return fallbackResponses.default;
}

/**
 * Check if Gemini API is available
 */
export function isGeminiAvailable(): boolean {
    return !!genAI;
}
