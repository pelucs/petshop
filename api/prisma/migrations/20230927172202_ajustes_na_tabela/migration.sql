/*
  Warnings:

  - You are about to drop the column `isLost` on the `Schedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tutor" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "dateService" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("contact", "dateService", "id", "observation", "petName", "service", "status", "tutor", "userId") SELECT "contact", "dateService", "id", "observation", "petName", "service", "status", "tutor", "userId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE UNIQUE INDEX "Schedule_id_key" ON "Schedule"("id");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("address", "email", "id", "name", "phone") SELECT "address", "email", "id", "name", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
