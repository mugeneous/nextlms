"use server";

import { revalidatePath } from "next/cache";

import { CourseServices } from "@/services/course.services";

export default async function UploadLessonAction(formData: FormData) {
  const id = formData.get("lessonId") as string;
  const title = formData.get("title") as string;
  const videoUrl = formData.get("videoUrl") as string;

  await CourseServices.updateLesson({ id, title, videoUrl });

  revalidatePath("/admin/courses/[slug]", "page");
}
