import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST instead." });
  }

  const { id, script, name, userId } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'id' field." });
  }

  if (!script || typeof script !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'script' field." });
  }

  try {
    const response = await fetch("https://tavusapi.com/v2/videos", {
      method: "POST",
      headers: {
        "x-api-key": "0ea1afb1660e4b8baa6810d26f7b3146",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        replica_id: id,
        script: script,
        video_name: name,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create video:", response.statusText);
      return res
        .status(response.status)
        .json({ error: "Failed to create video." });
    }

    const text = await response.text();

    try {
      const data = JSON.parse(text);

      try {
        const video = await prisma.video.create({
          data: {
            id: uuidv4(),
            status: data.status,
            name: data.video_name,
            hostedUrl: data.hosted_url,
            videoId: data.video_id,
            downloadUrl: "",
            script: "",
            statusDetails: "",
            streamUrl: "",
            replicaId: "",
          },
        });

        await prisma.userVideo.create({
          data: {
            userId: userId,
            videoId: video.id,
          },
        });

        res.status(200).json(data);
      } catch (e) {
        console.error("Write error:", e);
        res
          .status(500)
          .json({ error: "Failed to insert the record in the db." });
      }
    } catch (err) {
      console.error("Error parsing JSON:", err);
      res.status(500).json({ error: "Failed to parse response from API" });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from API" });
  }
}
