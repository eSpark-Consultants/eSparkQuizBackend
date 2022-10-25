/*
  Warnings:

  - Added the required column `amount` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
