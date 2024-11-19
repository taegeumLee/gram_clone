/*
  Warnings:

  - Added the required column `preferenceId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "ageRangeMin" INTEGER NOT NULL,
    "ageRangeMax" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "heightRangeMin" INTEGER NOT NULL,
    "heightRangeMax" INTEGER NOT NULL,
    "religion" TEXT NOT NULL,
    "drinking" TEXT NOT NULL,
    "smoking" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "lastActive" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preferenceId" TEXT NOT NULL,
    CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "user_preferences" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users" ("birthDate", "createdAt", "drinking", "education", "gender", "height", "id", "isActive", "isVerified", "job", "lastActive", "location", "phoneNumber", "religion", "smoking", "updatedAt") SELECT "birthDate", "createdAt", "drinking", "education", "gender", "height", "id", "isActive", "isVerified", "job", "lastActive", "location", "phoneNumber", "religion", "smoking", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
