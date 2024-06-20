/*
  Warnings:

  - A unique constraint covering the columns `[video_id]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `replica_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "replica_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "videos_video_id_key" ON "videos"("video_id");

-- CreateIndex
CREATE INDEX "videos_video_id_idx" ON "videos"("video_id");
