-- CreateTable
CREATE TABLE "public"."class_rooms" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "code" VARCHAR(12) NOT NULL,
    "names_mode" VARCHAR(8) NOT NULL DEFAULT 'names',
    "locale" VARCHAR(5) NOT NULL DEFAULT 'en',
    "last_used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."class_seats" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "seat_no" INTEGER NOT NULL,
    "display_name" VARCHAR(24),
    "icon" VARCHAR(24) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."class_assignments" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "kind" VARCHAR(8) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" JSONB NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."class_attempts" (
    "id" TEXT NOT NULL,
    "token" VARCHAR(24) NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,
    "page_ref" VARCHAR(200) NOT NULL,
    "level" VARCHAR(8),
    "right" INTEGER,
    "total" INTEGER,
    "items" JSONB,
    "checks" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reported_at" TIMESTAMP(3),

    CONSTRAINT "class_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_rooms_code_key" ON "public"."class_rooms"("code");

-- CreateIndex
CREATE INDEX "class_rooms_teacher_id_idx" ON "public"."class_rooms"("teacher_id");

-- CreateIndex
CREATE INDEX "class_rooms_last_used_at_idx" ON "public"."class_rooms"("last_used_at");

-- CreateIndex
CREATE UNIQUE INDEX "class_seats_class_id_seat_no_key" ON "public"."class_seats"("class_id", "seat_no");

-- CreateIndex
CREATE INDEX "class_assignments_class_id_idx" ON "public"."class_assignments"("class_id");

-- CreateIndex
CREATE UNIQUE INDEX "class_attempts_token_key" ON "public"."class_attempts"("token");

-- CreateIndex
CREATE INDEX "class_attempts_assignment_id_seat_id_idx" ON "public"."class_attempts"("assignment_id", "seat_id");

-- CreateIndex
CREATE INDEX "class_attempts_seat_id_idx" ON "public"."class_attempts"("seat_id");

-- AddForeignKey
ALTER TABLE "public"."class_rooms" ADD CONSTRAINT "class_rooms_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_seats" ADD CONSTRAINT "class_seats_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."class_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_assignments" ADD CONSTRAINT "class_assignments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."class_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_attempts" ADD CONSTRAINT "class_attempts_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "public"."class_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_attempts" ADD CONSTRAINT "class_attempts_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "public"."class_seats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

