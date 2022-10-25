/*
  Warnings:

  - You are about to drop the `_OrderToOrderItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToOrderItems" DROP CONSTRAINT "_OrderToOrderItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToOrderItems" DROP CONSTRAINT "_OrderToOrderItems_B_fkey";

-- DropTable
DROP TABLE "_OrderToOrderItems";

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
