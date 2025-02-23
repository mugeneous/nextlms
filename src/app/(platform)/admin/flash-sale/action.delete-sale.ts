"use server";

import { revalidatePath } from "next/cache";

import { FlashSaleServices } from "@/services/flashsale.services";

export default async function DeleteFlashSaleAction(formData: FormData) {
  const saleId = formData.get("saleId") as string;

  await FlashSaleServices.deleteFlashSale(saleId);

  revalidatePath("/admin/flash-sale");
}
