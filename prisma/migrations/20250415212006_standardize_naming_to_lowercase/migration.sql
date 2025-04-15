/*
  Warnings:

  - The primary key for the `ProviderPaymentMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentMethodId` on the `ProviderPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `ProviderPaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethodId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `payment_method_id` to the `ProviderPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `ProviderPaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProviderPaymentMethod" DROP CONSTRAINT "ProviderPaymentMethod_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "ProviderPaymentMethod" DROP CONSTRAINT "ProviderPaymentMethod_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "ProviderPaymentMethod" DROP CONSTRAINT "ProviderPaymentMethod_pkey",
DROP COLUMN "paymentMethodId",
DROP COLUMN "providerId",
ADD COLUMN     "payment_method_id" INTEGER NOT NULL,
ADD COLUMN     "provider_id" INTEGER NOT NULL,
ADD CONSTRAINT "ProviderPaymentMethod_pkey" PRIMARY KEY ("provider_id", "payment_method_id");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentMethodId",
ADD COLUMN     "payment_method_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ProviderPaymentMethod" ADD CONSTRAINT "ProviderPaymentMethod_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderPaymentMethod" ADD CONSTRAINT "ProviderPaymentMethod_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
