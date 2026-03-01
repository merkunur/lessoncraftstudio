-- AlterTable: Add user_id to license_keys
ALTER TABLE "license_keys" ADD COLUMN "user_id" TEXT;

-- CreateIndex
CREATE INDEX "license_keys_user_id_idx" ON "license_keys"("user_id");

-- AddForeignKey
ALTER TABLE "license_keys" ADD CONSTRAINT "license_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "license_devices" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "license_devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "license_devices_email_ip_address_key" ON "license_devices"("email", "ip_address");

-- CreateIndex
CREATE INDEX "license_devices_email_idx" ON "license_devices"("email");

-- CreateIndex
CREATE INDEX "license_devices_last_seen_at_idx" ON "license_devices"("last_seen_at");
