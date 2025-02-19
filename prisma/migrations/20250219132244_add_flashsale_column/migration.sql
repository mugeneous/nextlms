-- CreateTable
CREATE TABLE "FlashSale" (
    "id" TEXT NOT NULL,
    "newAmount" INTEGER NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "FlashSale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlashSale_courseId_key" ON "FlashSale"("courseId");

-- AddForeignKey
ALTER TABLE "FlashSale" ADD CONSTRAINT "FlashSale_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
