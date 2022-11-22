/*
  Warnings:

  - Added the required column `percentage` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "percentage" TEXT NOT NULL;
