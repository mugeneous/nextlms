import { prisma } from "@/utils/prisma";

export const FlashSaleServices = {
  createSale: async (newAmount: number, courseId: string) => {
    await prisma.flashSale.create({
      data: {
        newAmount,
        courseId,
      },
    });
  },
  getAllFlashSale: async () => {
    const flashSales = await prisma.flashSale.findMany({
      include: {
        course: true,
      },
    });

    return flashSales;
  },
  deleteFlashSale: async (saleId: string) => {
    await prisma.flashSale.delete({
      where: {
        id: saleId,
      },
    });
  },
};
