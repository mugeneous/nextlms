"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export default async function UpdateSectionForm(formData: FormData) {
  const id = formData.get("sectionId") as string;
  const title = formData.get("title") as string;

  await CourseServices.updateSection({ id, title });

  revalidatePath("/admin/courses/[slug]", "page");
}
