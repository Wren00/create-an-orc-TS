import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getChatCompletion() {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "user", content: "Can you give " }
        ]
    });

    console.log(response.choices[0].message.content);
}

getChatCompletion();