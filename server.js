import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// IMPORTANT: apni details daalo
const API_KEY = "YOUR_ELEVENLABS_API_KEY";
const VOICE_ID = "YOUR_VOICE_ID";

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Generate voice route
app.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.7
          }
        })
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Voice generation failed" });
    }

    const audio = await response.arrayBuffer();

    res.set({
      "Content-Type": "audio/mpeg"
    });

    res.send(Buffer.from(audio));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PORT fix (Railway compatible)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
