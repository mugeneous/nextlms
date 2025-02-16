"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/utils/prisma";

export default async function UpdateLessonIndexAction(formData: FormData) {
  const sectionId = formData.get("sectionId") as string;
  const sourceIndex = Number(formData.get("sourceIndex"));
  const destinationIndex = Number(formData.get("destinationIndex"));

  const allLessons = await prisma.lesson.findMany({
    where: {
      sectionId,
    },
    orderBy: {
      index: "asc",
    },
  });

  const newLessons = [...allLessons];
  const [movesLesson] = newLessons.splice(sourceIndex, 1);
  newLessons.splice(destinationIndex, 0, movesLesson);

  const reorderedLessons = newLessons.map((lesson, index) => {
    return {
      ...lesson,
      index: index,
    };
  });

  const updatePromised = reorderedLessons.map((lesson) =>
    prisma.lesson.update({
      where: {
        id: lesson.id,
      },
      data: {
        index: lesson.index,
      },
    }),
  );

  await Promise.all(updatePromised);

  revalidatePath("/admin/courses/[slug]", "page");
}
