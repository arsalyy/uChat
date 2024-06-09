import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use GET instead." });
  }

  const { video_id } = req.query;

  if (!video_id || typeof video_id !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'video_id' query parameter." });
  }

  try {
    const response = await fetch(`https://tavusapi.com/v2/videos/${video_id}`, {
      method: "GET",
      headers: {
        "x-api-key": "0ea1afb1660e4b8baa6810d26f7b3146",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch video:", response.statusText);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch video." });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from API" });
  }
}
