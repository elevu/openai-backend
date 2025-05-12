const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

export default async function handler(req, res) {
    const prompt = req.body?.prompt || "Suggest 5 songs";
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ suggestions: response.data.choices[0].message.content });
}
