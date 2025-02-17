"use server";

import { revalidatePath } from "next/cache";

import { UserServices } from "@/services/user.services";

export default async function banUserAction(_: unknown, formData: FormData) {
  const userId = formData.get("userId") as string;

  await UserServices.banUser(userId);

  revalidatePath("/admin/users");
}
