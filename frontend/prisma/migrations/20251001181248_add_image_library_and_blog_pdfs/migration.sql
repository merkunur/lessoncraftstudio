-- CreateTable
CREATE TABLE "public"."image_themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayNames" JSONB NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'images',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."image_library_items" (
    "id" TEXT NOT NULL,
    "theme_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "translations" JSONB NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_library_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blog_pdfs" (
    "id" TEXT NOT NULL,
    "post_slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "price" TEXT NOT NULL DEFAULT 'Free',
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_pdfs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_themes_name_key" ON "public"."image_themes"("name");

-- CreateIndex
CREATE INDEX "image_themes_name_idx" ON "public"."image_themes"("name");

-- CreateIndex
CREATE INDEX "image_themes_type_idx" ON "public"."image_themes"("type");

-- CreateIndex
CREATE INDEX "image_library_items_theme_id_idx" ON "public"."image_library_items"("theme_id");

-- CreateIndex
CREATE INDEX "image_library_items_filename_idx" ON "public"."image_library_items"("filename");

-- CreateIndex
CREATE INDEX "blog_pdfs_post_slug_idx" ON "public"."blog_pdfs"("post_slug");

-- AddForeignKey
ALTER TABLE "public"."image_library_items" ADD CONSTRAINT "image_library_items_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "public"."image_themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
