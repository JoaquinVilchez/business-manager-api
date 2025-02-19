/*
  Warnings:

  - Added the required column `zipcode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "zipcode" TEXT NOT NULL;
