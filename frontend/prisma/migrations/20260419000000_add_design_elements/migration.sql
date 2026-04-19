-- CreateTable: Design Elements Library
-- Decorative SVG elements (patterns, frames, corners, banners, etc.)
-- available to all 33 worksheet apps via the shared design-elements-loader.
CREATE TABLE "design_elements" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER,
    "mime_type" TEXT NOT NULL DEFAULT 'image/svg+xml',
    "translations" JSONB NOT NULL DEFAULT '{}',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "default_placement" TEXT,
    "default_scale" DOUBLE PRECISION,
    "tintable" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "design_elements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "design_elements_slug_key" ON "design_elements"("slug");
CREATE INDEX "design_elements_category_is_active_sort_order_idx" ON "design_elements"("category", "is_active", "sort_order");
CREATE INDEX "design_elements_tags_idx" ON "design_elements" USING GIN ("tags");
