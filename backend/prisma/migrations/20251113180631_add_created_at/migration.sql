-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FeedbackEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FeedbackEntry" ("comment", "id", "name", "rating") SELECT "comment", "id", "name", "rating" FROM "FeedbackEntry";
DROP TABLE "FeedbackEntry";
ALTER TABLE "new_FeedbackEntry" RENAME TO "FeedbackEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
