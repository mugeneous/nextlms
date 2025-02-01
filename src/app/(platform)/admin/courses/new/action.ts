"use server";

import { File } from "buffer";
import { z } from "zod";

import { CourseServices } from "@/services/course.services";

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number({ invalid_type_error: "Price must be a number" }),
  coverImage: z.instanceof(File),
});

export default async function createCourseAction(prevState: unknown, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const coverImage = formData.get("coverImage");

  const validation = courseSchema.safeParse({
    title,
    description,
    price,
    coverImage,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        title,
        description,
        price,
        coverImage,
      },
    };
  }

  const newCourse = await CourseServices.createCourse({
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
    coverImage: validation.data.coverImage.name,
  });

  if (!newCourse) {
    return {
      status: "error",
      message: "Error creating course",
    };
  }
}
