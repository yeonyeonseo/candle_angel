const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "당신은 양초에 깃든 천사입니다. 진지하고 부드럽게 상담해 주세요." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 300
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ reply: "오류가 발생했습니다. 나중에 다시 시도해 주세요." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.listen(80, () => {
  console.log('서버가 켜졌습니다.')
});