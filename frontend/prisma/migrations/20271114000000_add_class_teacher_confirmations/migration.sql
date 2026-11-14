-- CreateTable
CREATE TABLE "public"."class_teacher_confirmations" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "text_version" VARCHAR(16) NOT NULL,
    "confirmed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_teacher_confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_teacher_confirmations_teacher_id_key" ON "public"."class_teacher_confirmations"("teacher_id");

-- AddForeignKey
ALTER TABLE "public"."class_teacher_confirmations" ADD CONSTRAINT "class_teacher_confirmations_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
