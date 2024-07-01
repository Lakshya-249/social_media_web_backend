-- DropIndex
DROP INDEX "Room_name_key";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "name" SET DEFAULT 'none';
