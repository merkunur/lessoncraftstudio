-- CreateTable
CREATE TABLE "license_keys" (
    "id" TEXT NOT NULL,
    "license_key" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "product_tier" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "apps_access" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "source" TEXT NOT NULL DEFAULT 'warriorplus',
    "transaction_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "revoked_at" TIMESTAMP(3),
    "revoke_reason" TEXT,
    "activations_count" INTEGER NOT NULL DEFAULT 0,
    "max_activations" INTEGER NOT NULL DEFAULT 3,
    "last_used_at" TIMESTAMP(3),
    "last_used_ip" TEXT,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wplus_transactions" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "license_key_id" TEXT,
    "buyer_email" TEXT NOT NULL,
    "buyer_name" TEXT,
    "buyer_ip" TEXT,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "payment_method" TEXT,
    "affiliate_id" TEXT,
    "affiliate_amount" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "refunded_at" TIMESTAMP(3),
    "refund_amount" DOUBLE PRECISION,
    "refund_reason" TEXT,
    "raw_payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wplus_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wplus_webhook_events" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "error_message" TEXT,
    "payload" JSONB,

    CONSTRAINT "wplus_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "license_keys_license_key_key" ON "license_keys"("license_key");

-- CreateIndex
CREATE UNIQUE INDEX "license_keys_transaction_id_key" ON "license_keys"("transaction_id");

-- CreateIndex
CREATE INDEX "license_keys_license_key_idx" ON "license_keys"("license_key");

-- CreateIndex
CREATE INDEX "license_keys_email_idx" ON "license_keys"("email");

-- CreateIndex
CREATE INDEX "license_keys_transaction_id_idx" ON "license_keys"("transaction_id");

-- CreateIndex
CREATE INDEX "license_keys_status_idx" ON "license_keys"("status");

-- CreateIndex
CREATE INDEX "license_keys_product_tier_idx" ON "license_keys"("product_tier");

-- CreateIndex
CREATE UNIQUE INDEX "wplus_transactions_transaction_id_key" ON "wplus_transactions"("transaction_id");

-- CreateIndex
CREATE INDEX "wplus_transactions_transaction_id_idx" ON "wplus_transactions"("transaction_id");

-- CreateIndex
CREATE INDEX "wplus_transactions_buyer_email_idx" ON "wplus_transactions"("buyer_email");

-- CreateIndex
CREATE INDEX "wplus_transactions_license_key_id_idx" ON "wplus_transactions"("license_key_id");

-- CreateIndex
CREATE INDEX "wplus_transactions_status_idx" ON "wplus_transactions"("status");

-- CreateIndex
CREATE INDEX "wplus_transactions_affiliate_id_idx" ON "wplus_transactions"("affiliate_id");

-- CreateIndex
CREATE UNIQUE INDEX "wplus_webhook_events_event_id_key" ON "wplus_webhook_events"("event_id");

-- CreateIndex
CREATE INDEX "wplus_webhook_events_event_id_idx" ON "wplus_webhook_events"("event_id");

-- CreateIndex
CREATE INDEX "wplus_webhook_events_event_type_idx" ON "wplus_webhook_events"("event_type");

-- CreateIndex
CREATE INDEX "wplus_webhook_events_transaction_id_idx" ON "wplus_webhook_events"("transaction_id");

-- CreateIndex
CREATE INDEX "wplus_webhook_events_status_idx" ON "wplus_webhook_events"("status");

-- AddForeignKey
ALTER TABLE "wplus_transactions" ADD CONSTRAINT "wplus_transactions_license_key_id_fkey" FOREIGN KEY ("license_key_id") REFERENCES "license_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
