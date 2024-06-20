/*
  Warnings:

  - Added the required column `video_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "video_id" TEXT NOT NULL;
