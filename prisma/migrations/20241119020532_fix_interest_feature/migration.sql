-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_features" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "features_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_features" ("createdAt", "id", "name", "userId") SELECT "createdAt", "id", "name", "userId" FROM "features";
DROP TABLE "features";
ALTER TABLE "new_features" RENAME TO "features";
CREATE UNIQUE INDEX "features_userId_name_key" ON "features"("userId", "name");
CREATE TABLE "new_interests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_interests" ("createdAt", "id", "name", "userId") SELECT "createdAt", "id", "name", "userId" FROM "interests";
DROP TABLE "interests";
ALTER TABLE "new_interests" RENAME TO "interests";
CREATE UNIQUE INDEX "interests_userId_name_key" ON "interests"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
