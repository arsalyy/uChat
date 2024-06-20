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

  const { email, name, uchatId } = req.body;

  if (!uchatId) {
    return res.status(400).json({
      error: "UChat id is required.",
    });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { uchatId },
      include: {
        videos: {
          include: {
            video: true,
          },
        },
      },
    });

    if (!user) {
      if (!email && !name) {
        return res.status(400).json({
          error: "Email and Name is required for new user.",
        });
      }

      user = await prisma.user.create({
        data: { id: uuidv4(), email, name, uchatId },
        include: {
          videos: {
            include: {
              video: true,
            },
          },
        },
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error creating or fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
