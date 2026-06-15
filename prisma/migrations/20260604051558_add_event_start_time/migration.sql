/*
  Warnings:

  - Added the required column `eventStartTime` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "eventStartTime" TEXT NOT NULL;
