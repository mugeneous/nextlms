"use server";

import { revalidatePath } from "next/cache";

import { FlashSaleServices } from "@/services/flashsale.services";

export default async function CreateSaleAction(_: unknown, formData: FormData) {
  const newAmount = Number(formData.get("newAmount"));
  const courseId = formData.get("courseId") as string;

  await FlashSaleServices.createSale(newAmount, courseId);

  revalidatePath("/admin/flash-sale");
}
