/*
  Warnings:

  - You are about to drop the column `userId` on the `user_preferences` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_user_preferences" ("ageRangeMax", "ageRangeMin", "distance", "drinking", "gender", "heightRangeMax", "heightRangeMin", "id", "location", "religion", "smoking") SELECT "ageRangeMax", "ageRangeMin", "distance", "drinking", "gender", "heightRangeMax", "heightRangeMin", "id", "location", "religion", "smoking" FROM "user_preferences";
DROP TABLE "user_preferences";
ALTER TABLE "new_user_preferences" RENAME TO "user_preferences";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
