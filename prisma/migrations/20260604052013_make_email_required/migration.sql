/*
  Warnings:

  - Made the column `email` on table `Inquiry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Inquiry" ALTER COLUMN "email" SET NOT NULL;
