-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'public';
