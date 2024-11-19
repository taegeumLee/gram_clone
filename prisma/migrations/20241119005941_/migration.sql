/*
  Warnings:

  - You are about to drop the column `features` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `users` table. All the data in the column will be lost.
  - Added the required column `order` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "interests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "features_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_photos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_photos" ("id", "url", "userId") SELECT "id", "url", "userId" FROM "photos";
DROP TABLE "photos";
ALTER TABLE "new_photos" RENAME TO "photos";
CREATE UNIQUE INDEX "photos_userId_order_key" ON "photos"("userId", "order");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "education" TEXT,
    "job" TEXT,
    "religion" TEXT,
    "drinking" TEXT,
    "smoking" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastActive" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("birthDate", "createdAt", "drinking", "education", "gender", "height", "id", "isActive", "isVerified", "job", "lastActive", "location", "phoneNumber", "religion", "smoking", "updatedAt") SELECT "birthDate", "createdAt", "drinking", "education", "gender", "height", "id", "isActive", "isVerified", "job", "lastActive", "location", "phoneNumber", "religion", "smoking", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "interests_userId_name_key" ON "interests"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "features_userId_name_key" ON "features"("userId", "name");
