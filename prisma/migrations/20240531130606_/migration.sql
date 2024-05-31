/*
  Warnings:

  - Added the required column `description` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "description" TEXT NOT NULL;
