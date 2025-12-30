/*
  Warnings:

  - Added the required column `createdBy` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3),
ADD COLUMN     "updateBy" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3),
ADD COLUMN     "updateBy" TEXT;
