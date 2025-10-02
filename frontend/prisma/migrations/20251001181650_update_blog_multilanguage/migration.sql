/*
  Warnings:

  - You are about to drop the column `post_slug` on the `blog_pdfs` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `meta_description` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `meta_keywords` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `meta_title` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `blog_posts` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `blog_pdfs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `blog_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translations` to the `blog_posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."blog_pdfs_post_slug_idx";

-- AlterTable
ALTER TABLE "public"."blog_pdfs" DROP COLUMN "post_slug",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."blog_posts" DROP COLUMN "content",
DROP COLUMN "excerpt",
DROP COLUMN "meta_description",
DROP COLUMN "meta_keywords",
DROP COLUMN "meta_title",
DROP COLUMN "title",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "translations" JSONB NOT NULL;

-- CreateIndex
CREATE INDEX "blog_pdfs_post_id_idx" ON "public"."blog_pdfs"("post_id");

-- AddForeignKey
ALTER TABLE "public"."blog_pdfs" ADD CONSTRAINT "blog_pdfs_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
