import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse large JSON payloads for high-resolution base64 images
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Initialize Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({ status: "ok", hasApiKey });
});

// Analyze Selfie Quality & Recommendations
app.post("/api/analyze-selfie", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({
        error: "Gemini API key is missing. Please add GEMINI_API_KEY in Secrets.",
      });
    }

    const { imageBase64, mimeType = "image/jpeg" } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 payload" });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType,
            },
          },
          {
            text: `Analyze this selfie for generating a professional AI headshot. Return a JSON object with:
- "lightingRating": "Excellent" | "Good" | "Needs Improvement"
- "lightingTip": short assessment of lighting on the face
- "poseRating": "Excellent" | "Good" | "Needs Improvement"
- "poseTip": short note on face angle and posture
- "recommendedStyles": list of 3 style names that would look best for this person (e.g., "Corporate Grey", "Modern Tech Office", "Outdoor Natural")
- "summary": 1-2 positive sentences giving feedback to the user on their photo.
Return ONLY valid raw JSON with no markdown wrapping.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json({ success: true, analysis: data });
  } catch (err: any) {
    console.error("Error analyzing selfie:", err);
    return res.status(500).json({
      error: err.message || "Failed to analyze selfie",
    });
  }
});

// Generate AI Headshot Endpoint
app.post("/api/generate-headshot", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({
        error: "GEMINI_API_KEY environment variable is missing.",
      });
    }

    const {
      imageBase64,
      mimeType = "image/jpeg",
      styleName = "Corporate Grey Backdrop",
      stylePrompt = "Classic textured dark grey studio backdrop with soft depth of field",
      attire = "Tailored Navy Blazer with crisp white dress shirt",
      expression = "Confident warm smile, direct eye contact with camera",
      lighting = "Soft studio three-point butterfly lighting",
      framing = "Professional bust & shoulder portrait",
      aspectRatio = "1:1",
      promptDetails = "",
      count = 1,
    } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No selfie image provided." });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const promptText = `Generate a high-quality, crisp, photorealistic professional executive studio headshot based on the face and features of the person in this input selfie photo.

CRITICAL LIKENESS INSTRUCTION:
- Retain the subject's exact facial identity, face shape, eye structure, nose, mouth, skin tone, hair type, and key features from the input photo.
- Do NOT alter their ethnicity, age, or key features.
- Replace any casual clothing, cluttered background, or harsh selfie lighting with high-end professional photography elements.

PHOTOGRAPHY SPECIFICATIONS:
- Setting / Background: ${stylePrompt}
- Attire: ${attire}
- Facial Expression & Pose: ${expression}
- Lighting Setup: ${lighting}
- Composition / Framing: ${framing}
${promptDetails ? `- Additional Details: ${promptDetails}` : ""}

Ensure the output is a pristine, high-resolution portrait photograph suitable for corporate websites, LinkedIn, executive bio, and professional press.`;

    const generatedImages: string[] = [];

    // Generate 'count' variations (default 1 or up to 2)
    const numToGenerate = Math.min(Math.max(1, Number(count) || 1), 2);

    for (let i = 0; i < numToGenerate; i++) {
      const variationPrompt = i === 0
        ? promptText
        : `${promptText}\nVariation ${i + 1}: Subtle adjustment in posture angle and light reflection.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType,
              },
            },
            {
              text: variationPrompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: (aspectRatio === "3:4" || aspectRatio === "4:3" || aspectRatio === "16:9" || aspectRatio === "9:16") ? aspectRatio : "1:1",
            imageSize: "1K",
          },
        },
      });

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || "image/png";
            generatedImages.push(`data:${mime};base64,${part.inlineData.data}`);
          }
        }
      }
    }

    if (generatedImages.length === 0) {
      return res.status(500).json({
        error: "The model completed but did not return an image part. Try adjusting prompt settings or uploading a clearer selfie.",
      });
    }

    return res.json({
      success: true,
      images: generatedImages,
      meta: {
        styleName,
        attire,
        expression,
        lighting,
        framing,
        aspectRatio,
      },
    });
  } catch (err: any) {
    console.error("Headshot Generation Error:", err);
    return res.status(500).json({
      error: err.message || "Failed to generate AI headshot. Please try again.",
    });
  }
});

// Touchup / Refine Headshot
app.post("/api/touchup-headshot", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({
        error: "GEMINI_API_KEY environment variable is missing.",
      });
    }

    const {
      headshotBase64,
      mimeType = "image/png",
      instruction = "Enhance resolution, soften background bokeh, and adjust skin tone slightly warmer.",
    } = req.body;

    if (!headshotBase64) {
      return res.status(400).json({ error: "Missing headshotBase64 parameter." });
    }

    const cleanBase64 = headshotBase64.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType,
            },
          },
          {
            text: `Refine and touch up this professional headshot photograph according to these instructions while keeping the exact face and identity:
Instruction: ${instruction}
Maintain realistic skin textures and professional studio lighting quality.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K",
        },
      },
    });

    let touchedUpImage: string | null = null;
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/png";
          touchedUpImage = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!touchedUpImage) {
      return res.status(500).json({ error: "Failed to touch up headshot image." });
    }

    return res.json({ success: true, image: touchedUpImage });
  } catch (err: any) {
    console.error("Touchup Error:", err);
    return res.status(500).json({ error: err.message || "Failed to touch up image." });
  }
});

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Headshot Server listening on http://localhost:${PORT}`);
  });
}

startServer();
