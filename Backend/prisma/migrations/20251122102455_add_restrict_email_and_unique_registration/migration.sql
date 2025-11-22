/*
  Warnings:

  - A unique constraint covering the columns `[event_id,email]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Events` ADD COLUMN `allowed_email_domain` VARCHAR(191) NULL,
    ADD COLUMN `restrict_email_domain` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Registration_event_id_email_key` ON `Registration`(`event_id`, `email`);
