/*
  Warnings:

  - The required column `uuid` was added to the `files` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `files` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;
