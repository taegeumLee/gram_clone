/*
  Warnings:

  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "features" TEXT;
ALTER TABLE "users" ADD COLUMN "interests" TEXT;
ALTER TABLE "users" ADD COLUMN "preferences" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "features";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "interests";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "preferences";
PRAGMA foreign_keys=on;
