-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "albumId" TEXT;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Albuns"("id") ON DELETE SET NULL ON UPDATE CASCADE;
