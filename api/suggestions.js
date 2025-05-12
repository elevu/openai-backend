export default async function handler(req, res) {
    console.log("Function invoked");

    if (!process.env.OPENAI_API_KEY) {
        console.error("Missing OPENAI_API_KEY");
        return res.status(500).json({ error: "Missing OpenAI API key" });
    }

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const prompt = req.body?.prompt || "Suggest 5 playlists";
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
