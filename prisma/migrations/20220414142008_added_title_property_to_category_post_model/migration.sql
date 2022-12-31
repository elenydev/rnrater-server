/*
  Warnings:

  - Added the required column `title` to the `CategoryPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryPost" ADD COLUMN     "title" TEXT NOT NULL;
