"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/utils/prisma";

export default async function UpdateSectionIndexAction(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const sourceIndex = Number(formData.get("sourceIndex"));
  const destinationIndex = Number(formData.get("destinationIndex"));

  const sections = await prisma.section.findMany({
    where: {
      courseId,
    },
    orderBy: {
      index: "asc",
    },
  });

  const newSections = [...sections];
  const [movedSection] = newSections.splice(sourceIndex, 1);
  newSections.splice(destinationIndex, 0, movedSection);

  const updatedSections = newSections.map((section, index) => ({
    ...section,
    index: index,
  }));

  const updatePromises = updatedSections.map((section) => {
    return prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        index: section.index,
      },
    });
  });

  await Promise.all(updatePromises);

  revalidatePath("/admin/courses/[slug]", "page");
}
