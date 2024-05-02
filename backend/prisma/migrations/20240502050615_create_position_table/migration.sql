/*
  Warnings:

  - You are about to drop the column `positions` on the `rovers` table. All the data in the column will be lost.
  - Added the required column `plan_size_x` to the `rovers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_size_y` to the `rovers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('N', 'S', 'E', 'W');

-- AlterTable
ALTER TABLE "rovers" DROP COLUMN "positions",
ADD COLUMN     "plan_size_x" INTEGER NOT NULL,
ADD COLUMN     "plan_size_y" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rover_id" TEXT NOT NULL,
    "axisX" INTEGER NOT NULL,
    "axisY" INTEGER NOT NULL,
    "direction" "Direction" NOT NULL,
    "is_last_position" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_rover_id_fkey" FOREIGN KEY ("rover_id") REFERENCES "rovers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
