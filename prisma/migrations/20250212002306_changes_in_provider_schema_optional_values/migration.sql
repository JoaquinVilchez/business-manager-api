-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_invoice_type_id_fkey";

-- DropIndex
DROP INDEX "Provider_alias_key";

-- DropIndex
DROP INDEX "Provider_cbu_key";

-- DropIndex
DROP INDEX "Provider_email_key";

-- DropIndex
DROP INDEX "Provider_phone_key";

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "cuit" DROP NOT NULL,
ALTER COLUMN "responsable" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "address_id" DROP NOT NULL,
ALTER COLUMN "alias" DROP NOT NULL,
ALTER COLUMN "cbu" DROP NOT NULL,
ALTER COLUMN "invoice_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_invoice_type_id_fkey" FOREIGN KEY ("invoice_type_id") REFERENCES "InvoiceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
