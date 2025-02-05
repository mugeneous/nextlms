"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export default async function AddSectionAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;

  await CourseServices.createSection(courseId);

  // console.log(response);

  revalidatePath("/admin/courses/[slug]", "page");
}
