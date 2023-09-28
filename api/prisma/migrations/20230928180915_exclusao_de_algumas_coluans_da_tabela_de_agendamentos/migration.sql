/*
  Warnings:

  - You are about to drop the column `contact` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `tutor` on the `Schedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "dateService" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("dateService", "id", "observation", "petName", "service", "status", "userId") SELECT "dateService", "id", "observation", "petName", "service", "status", "userId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE UNIQUE INDEX "Schedule_id_key" ON "Schedule"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
