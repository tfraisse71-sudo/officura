// api/gemini.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY on server" });

  const { prompt } = req.body ?? {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt (string)" });
  }

  const model = "gemini-1.5-flash"; // ou gemini-1.5-pro selon ton besoin
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error ?? data });

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("") ?? "";

    return res.status(200).json({ text, raw: data });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Server error" });
  }
}
