/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `tweets` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tweets` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- DropIndex
DROP INDEX "users_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_tweets" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "tweets";
DROP TABLE "tweets";
ALTER TABLE "new_tweets" RENAME TO "tweets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
