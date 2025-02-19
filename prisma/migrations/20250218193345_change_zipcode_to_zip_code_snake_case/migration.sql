/*
  Warnings:

  - You are about to drop the column `zipcode` on the `Address` table. All the data in the column will be lost.
  - Added the required column `zip_code` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "zipcode",
ADD COLUMN     "zip_code" TEXT NOT NULL;
