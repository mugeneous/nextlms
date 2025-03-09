"use server";

import { redirect } from "next/navigation";

import ServerAuth from "@/libs/server-auth";
import TransactionServices from "@/services/transaction.services";

export default async function BuyCourseAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const amount = Number(formData.get("amount"));

  const user = await ServerAuth();

  if (!user) {
    redirect("/login");
  }

  const data = await TransactionServices.createTransaction(user.id, courseId, amount);

  redirect(data.paymentLink);
}
