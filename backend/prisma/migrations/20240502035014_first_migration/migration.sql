-- CreateTable
CREATE TABLE "rovers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "positions" JSONB NOT NULL,

    CONSTRAINT "rovers_pkey" PRIMARY KEY ("id")
);
