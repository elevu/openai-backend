import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const prompt = req.body?.prompt || "Suggest 5 songs";
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json({ suggestions: completion.data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: error.message });
    }
}
