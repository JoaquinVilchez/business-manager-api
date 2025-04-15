-- Agregar las columnas como NULLABLE primero
ALTER TABLE "PaymentMethod" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "PaymentMethod" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP(3);
ALTER TABLE "PaymentMethod" ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMP(3);

-- Actualizar los registros existentes
UPDATE "PaymentMethod" SET "created_at" = CURRENT_TIMESTAMP WHERE "created_at" IS NULL;
UPDATE "PaymentMethod" SET "updated_at" = CURRENT_TIMESTAMP WHERE "updated_at" IS NULL;

-- Hacer las columnas NOT NULL
ALTER TABLE "PaymentMethod" ALTER COLUMN "created_at" SET NOT NULL;
ALTER TABLE "PaymentMethod" ALTER COLUMN "updated_at" SET NOT NULL; 