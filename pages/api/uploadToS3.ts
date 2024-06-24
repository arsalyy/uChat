import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable, { File } from "formidable";
import fs from "fs";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? "",
  },
});

async function uploadFileToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
) {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: fileBuffer,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return response;
  } catch (error) {
    throw error;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const fileArray = files.file as unknown as File[];
    const file = fileArray[0];

    if (!file || !file.filepath) {
      console.error("No file uploaded or invalid file path");
      return res
        .status(400)
        .json({ error: "No file uploaded or invalid file path" });
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}_${file.originalFilename}`;

    try {
      await uploadFileToS3(
        fileBuffer,
        fileName,
        file.mimetype || "application/octet-stream"
      );

      return res.status(200).json({
        message: "File uploaded successfully",
        fileName,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({ error: "Failed to upload file" });
    }
  });
}
