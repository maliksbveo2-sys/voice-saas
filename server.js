import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "sk_7da49b1049a2688cc2deb03f3cc537476a936ee888b5f32e";
const VOICE_ID = "nzFihrBIvB34imQBuxub";

app.post("/generate", async (req, res) => {
  const { text } = req.body;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const audio = await response.arrayBuffer();
  res.send(Buffer.from(audio));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
