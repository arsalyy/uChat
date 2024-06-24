import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST instead." });
  }

  const { training_video_url, replica_name } = req.body;

  if (!training_video_url || !replica_name) {
    return res
      .status(400)
      .json({ error: "training_video_url and replica_name are required." });
  }

  const options = {
    method: "POST",
    headers: {
      "x-api-key": "0ea1afb1660e4b8baa6810d26f7b3146",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      train_video_url: `https://my-omni-growth-uchat-bucket.s3.amazonaws.com/${training_video_url}`,
      replica_name,
    }),
  };

  try {
    const response = await fetch("https://tavusapi.com/v2/replicas", options);

    if (!response.ok) {
      console.error("Failed to create replica:", response.statusText);
      return res
        .status(response.status)
        .json({ error: "Failed to create replica." });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from API" });
  }
}
