-- CreateTable: Lemon Squeezy purchases
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "ls_order_id" TEXT NOT NULL,
    "ls_product_id" TEXT NOT NULL,
    "buyer_email" TEXT NOT NULL,
    "buyer_name" TEXT,
    "user_id" TEXT,
    "apps_access" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL DEFAULT 'active',
    "refunded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Lemon Squeezy webhook events (idempotency + audit)
CREATE TABLE "ls_webhook_events" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "order_id" TEXT,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'processed',
    "error_message" TEXT,
    "payload" JSONB,

    CONSTRAINT "ls_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: purchases
CREATE UNIQUE INDEX "purchases_ls_order_id_key" ON "purchases"("ls_order_id");
CREATE INDEX "purchases_buyer_email_idx" ON "purchases"("buyer_email");
CREATE INDEX "purchases_ls_order_id_idx" ON "purchases"("ls_order_id");
CREATE INDEX "purchases_user_id_idx" ON "purchases"("user_id");
CREATE INDEX "purchases_status_idx" ON "purchases"("status");

-- CreateIndex: ls_webhook_events
CREATE UNIQUE INDEX "ls_webhook_events_event_id_key" ON "ls_webhook_events"("event_id");
CREATE INDEX "ls_webhook_events_event_id_idx" ON "ls_webhook_events"("event_id");
CREATE INDEX "ls_webhook_events_event_type_idx" ON "ls_webhook_events"("event_type");

-- AddForeignKey: purchases.user_id -> users.id
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
